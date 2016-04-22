import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match, createMemoryHistory } from 'react-router'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet'
import createRoutes from 'routes.jsx'
import { apiUrl } from 'config'
import { configureAxios } from 'helpers.js'
import configureStore from 'store/configureStore'
import { fetchComponentDataBeforeRender } from 'api/fetchComponentDataBeforeRender'


configureAxios( apiUrl )

/**
 * Initial html template
 *
 * TODO: Get and print the real document title.
 *
 * @param  {string} html         Content.
 * @param  {object} initialState Initial state.
 * @return {string}              Template.
 */
function renderFullPage( html, initialState ) {
	let head = Helmet.rewind()

	return `<!doctype html>
<html>
  <head>
    <meta charset=utf-8 />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${ head.title.toString() }
    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700,300italic|Open+Sans:400,400italic,600,600italic,700,700italic&subset=latin,greek,cyrillic,vietnamese,cyrillic-ext,latin-ext'>
    <link rel="stylesheet" href="/assets/genericons/genericons/genericons.css" />
    <link rel="stylesheet" href="/assets/style.css" />
  </head>
  <body>
    <div id="app">${ html }</div>
    <script>
      window.__INITIAL_STATE__ = ${ JSON.stringify( initialState ) };
    </script>
    <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
  </body>
</html>`
}


export default function render( req, res ) {
	const history = createMemoryHistory();
	const store = configureStore( { info: {
		apiUrl: apiUrl
	} }, history );
	const routes = createRoutes( store );

	/*
	 * From the react-router docs:
	 *
	 * This function is to be used for server-side rendering. It matches a set of routes to
	 * a location, without rendering, and calls a callback(error, redirectLocation, renderProps)
	 * when it's done.
	 *
	 * The function will create a `history` for you, passing additional `options` to create it.
	 * These options can include `basename` to control the base name for URLs, as well as the pair
	 * of `parseQueryString` and `stringifyQuery` to control query string parsing and serializing.
	 * You can also pass in an already instantiated `history` object, which can be constructured
	 * however you like.
	 *
	 * The three arguments to the callback function you pass to `match` are:
	 * - error: A javascript Error object if an error occured, `undefined` otherwise.
	 * - redirectLocation: A `Location` object if the route is a redirect, `undefined` otherwise
	 * - renderProps: The props you should pass to the routing context if the route matched, `undefined`
	 *                otherwise.
	 * If all three parameters are `undefined`, this means that there was no route found matching the
	 * given location.
	 */
	match( { routes, location: req.url }, ( error, redirectLocation, renderProps ) => {
		if ( error ) {
			res.status( 500 ).send( error.message );
		} else if ( redirectLocation ) {
			res.redirect( 302, redirectLocation.pathname + redirectLocation.search );
		} else if ( renderProps ) {

			const fetchParams = Object.assign( {}, renderProps.params, renderProps.location.query )
			const InitialView = (
				<Provider store={ store }>
					<RouterContext { ...renderProps } />
				</Provider>
			);

			// This method waits for all render component promises to resolve before returning to browser.
			fetchComponentDataBeforeRender( store.dispatch, renderProps.components, fetchParams )
				.then( html => {
					const componentHTML = renderToString( InitialView );
					const initialState = store.getState();

					res.status( 200 ).end( renderFullPage( componentHTML, initialState ) );
				})
				.catch( err => {
					res.end( renderFullPage( '', {} ) );
				});
		} else {
			res.status( 404 ).send( 'Not Found' );
		}
	});
}
