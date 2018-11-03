import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';

import routes from './config/routes';
import { apiUrl } from '../config/app/config';
import configureStore from './store';
import fetchComponentDataBeforeRender from './api/fetchComponentDataBeforeRender';
import { configureAxios } from './helpers';
import App from './containers/App';

/**
 * Initial html
 *
 * TODO: Add feed URLs <link rel="alternate" href="/feed" type="application/rss+xml" />.
 * TODO: Add sitemap URLs.
 *
 * @param  {string} content      Content.
 * @param  {object} initialState Initial state.
 * @return {string}              Template.
 */
function createInitialHtml( content, initialState, env = 'production' ) {
	const { htmlAttributes, title } = Helmet.rewind();

	return `<!doctype html>
<html class="no-js" ${ htmlAttributes.toString() }>
	<head>
		<meta charset=utf-8 />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		${ title.toString() }
		<!--link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700,300italic|Open+Sans:400,400italic,600,600italic,700,700italic&subset=latin,greek,cyrillic,vietnamese,cyrillic-ext,latin-ext'-->
		${ env === 'production' ? '<link rel="stylesheet" href="/assets/app.css" />' : '' }
	</head>
	<body>
		<div id="app">${ content }</div>
		<script>window.__INITIAL_STATE__ = ${JSON.stringify( initialState )};</script>
		<script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
	</body>
</html>`;
}

export default function render( env, req, res, next ) {
	const store = configureStore( {
		info: { apiUrl },
	} );

	let match;
	const activeRoute = routes.find( route => {
		match = matchPath( req.url, route );
		return Boolean( match );
	} );
	const components = [ activeRoute.component, App ];
	const fetchParams = {
		...match.params,
		...req.query,
	};
	const context = {};

	configureAxios( apiUrl );

	fetchComponentDataBeforeRender( store.dispatch, components, fetchParams )
		.then( () => {
			const InitialView = (
				<Provider store={ store }>
					<StaticRouter location={ req.url } context={ context }>
						<App />
					</StaticRouter>
				</Provider>
			);
			const markup = createInitialHtml(
				renderToString( InitialView ),
				store.getState(),
				env,
			);

			res.status( 200 ).end( markup );
		} )
		.catch( next );

	// TODO: 30x, 40x, 50x.
}
