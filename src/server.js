import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';

import { AppContext } from './contexts';
import createRoutes from './routes';
import configureStore from './store';
import fetchInitialData from './api/fetchInitialData';
import { configureAxios, discoverApi, getInfo, getTaxonomies } from './api/utils';
import App from './containers/App';

/**
 * Initial html
 *
 * TODO: Add feed URLs <link rel="alternate" href="/feed" type="application/rss+xml" />.
 * TODO: Add sitemap URLs.
 *
 * @param  {object} manifest     Assets manifest.
 * @param  {string} content      Content.
 * @param  {object} initialState Initial state.
 * @return {string}              Template.
 */
function createInitialHtml( config, manifest, content, initialState ) {
	const { env = 'production', ...restConfig } = config;
	const { htmlAttributes, title } = Helmet.rewind();
	const stylesheets = env === 'production'
		? `\n<link rel="stylesheet" href="${ manifest[ 'main.css' ] }" />`
		: '';

	return `<!doctype html>
<html class="no-js" ${ htmlAttributes.toString() }>
	<head>
		<meta charset=utf-8 />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		${ title.toString() }${ stylesheets }
	</head>
	<body>
		<div id="app">${ content }</div>
		<script>window.__CONFIG__ = ${ JSON.stringify( restConfig ) };</script>
		<script>window.__INITIAL_STATE__ = ${ JSON.stringify( initialState ) };</script>
		<script type="text/javascript" charset="utf-8" src="${ manifest[ 'main.js' ] }"></script>
	</body>
</html>`;
}

export default async function render( config, manifest, req, res, next ) {
	const apiRoot = await discoverApi( config.siteUrl );

	// TODO: Send error if the above fails.

	// Set axios' defaults for node.
	configureAxios( apiRoot );

	const info = await getInfo();
	const taxonomies = await getTaxonomies();
	const routes = createRoutes( taxonomies, config.blogPrefix );
	const store = configureStore( {
		info: {
			apiRoot,
			...info,
		},
		taxonomies: {
			items: taxonomies,
		},
	} );

	let match;
	const activeRoute = routes.find( route => {
		match = matchPath( req.url, route );
		return Boolean( match );
	} );

	const { params } = match;
	const { ignored, ...restParams } = params;
	const args = {
		url: req.url,
		params: {
			...restParams,
			...req.query,
		},
	};
	const components = [ App, activeRoute.component ];
	const context = {};
	const appContext = {
		...config,
		isServer: true,
	};

	fetchInitialData( store.dispatch, components, args )
		.then( () => {
			const InitialView = (
				<Provider store={ store }>
					<StaticRouter location={ req.url } context={ context }>
						<AppContext.Provider value={ appContext }>
							<App routes={ routes } />
						</AppContext.Provider>
					</StaticRouter>
				</Provider>
			);

			const markup = createInitialHtml(
				config,
				manifest,
				renderToString( InitialView ),
				store.getState(),
			);
			const status = Number( context.status ) || 200;

			res.status( status ).end( markup );
		} )
		.catch( next );

	// TODO: 30x, 40x, 50x.
}
