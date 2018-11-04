import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';

import routes from './config/routes';
import { siteUrl } from './config/app';
import configureStore from './store';
import fetchInitialData from './api/fetchInitialData';
import { configureAxios, discoverApi } from './api/utils';
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
		<!--link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700,300italic|Open+Sans:400,400italic,600,600italic,700,700italic&subset=latin,greek,cyrillic,vietnamese,cyrillic-ext,latin-ext'-->
		${ env === 'production' ? `<link rel="stylesheet" href="${ manifest[ 'main.css' ] }" />` : '' }
	</head>
	<body>
		<div id="app">${ content }</div>
		<script>window.__INITIAL_STATE__ = ${JSON.stringify( initialState )};</script>
		<script type="text/javascript" charset="utf-8" src="${ manifest[ 'main.js' ] }"></script>
	</body>
</html>`;
}

export default async function render( env, manifest, req, res, next ) {
	const apiRoot = await discoverApi( siteUrl );
	const store = configureStore( {
		info: {
			apiRoot,
			siteUrl,
		},
	} );

	let match;
	const activeRoute = routes.find( route => {
		match = matchPath( req.url, route );
		return Boolean( match );
	} );
	const components = [ App, activeRoute.component ];
	const fetchParams = {
		...match.params,
		...req.query,
	};
	const context = {};

	// Set axios' defaults for node.
	configureAxios( apiRoot );

	fetchInitialData( store.dispatch, components, fetchParams )
		.then( () => {
			const InitialView = (
				<Provider store={ store }>
					<StaticRouter location={ req.url } context={ context }>
						<App />
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
