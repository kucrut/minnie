import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import axios from 'axios';

import { siteUrl } from './config';
import createRoutes from './routes';
import configureStore from './store';
import fetchInitialData from './api/fetchInitialData';
import { collectItems, configureAxios, discoverApi } from './api/utils';
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
function createInitialHtml( manifest, content, initialState, env = 'production' ) {
	const { htmlAttributes, title } = Helmet.rewind();

	return `<!doctype html>
<html class="no-js" ${ htmlAttributes.toString() }>
	<head>
		<meta charset=utf-8 />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		${ title.toString() }
		${ env === 'production' ? `<link rel="stylesheet" href="${ manifest[ 'main.css' ] }" />` : '' }
	</head>
	<body>
		<div id="app">${ content }</div>
		<script>window.__INITIAL_STATE__ = ${JSON.stringify( initialState )};</script>
		<script type="text/javascript" charset="utf-8" src="${ manifest[ 'main.js' ] }"></script>
	</body>
</html>`;
}

// TODO: Move this out.
async function getTaxonomies() {
	try {
		const response = await axios.get( '/wp/v2/taxonomies' );
		return collectItems( response.data );
	} catch ( e ) {
		// TODO.
	}
}

// TODO: Move this out.
async function getInfo() {
	try {
		const response = await axios.get( '/bridge/v1/info' );
		return response.data;
	} catch ( e ) {
		// TODO.
	}
}

export default async function render( env, manifest, req, res, next ) {
	const apiRoot = await discoverApi( siteUrl );
	// TODO: Send error if the above fails.

	// Set axios' defaults for node.
	configureAxios( apiRoot );

	const info = await getInfo();
	const taxonomies = await getTaxonomies();
	const routes = createRoutes( taxonomies );
	const store = configureStore( {
		info: {
			apiRoot,
			siteUrl,
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

	fetchInitialData( store.dispatch, components, args )
		.then( () => {
			const InitialView = (
				<Provider store={ store }>
					<StaticRouter location={ req.url } context={ context }>
						<App routes={ routes } />
					</StaticRouter>
				</Provider>
			);
			const markup = createInitialHtml(
				manifest,
				renderToString( InitialView ),
				store.getState(),
				env,
			);

			res.status( 200 ).end( markup );
		} )
		.catch( next );

	// TODO: 30x, 40x, 50x.
}
