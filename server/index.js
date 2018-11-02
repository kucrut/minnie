const path = require( 'path' );
const express = require( 'express' );
const webpack = require( 'webpack' );

const { port } = require( '../config/app/config' );
const App = require( '../public/assets/server.js' );

const app = express();

if ( process.env.NODE_ENV === 'development' ) {
	const webpackConfig = require( '../config/webpack/dev-client' )( 'development' );
	const compiler = webpack( webpackConfig );
	const devMiddleware = require( 'webpack-dev-middleware' )( compiler, {
		noInfo: true,
		publicPath: webpackConfig.output.publicPath,
	} );
	const hotMiddleware = require( 'webpack-hot-middleware' )( compiler );

	app.use( devMiddleware );
	app.use( hotMiddleware );
}

// Bootstrap application settings.
app.set( 'port', port );
// X-Powered-By header has no functional value.
// Keeping it makes it easier for an attacker to build the site's profile
// It can be removed safely
app.disable( 'x-powered-by' );
app.set( 'view cache', false );
app.use( express.static( path.join( __dirname, '..', 'public' ) ) );

// Routing.
// TODO: Check config before disabling favicon.
app.get( '/favicon.ico', ( req, res ) => res.status( 204 ) );
app.get( '*', ( ...args ) => App.default( ...args ) );

/* eslint-disable-next-line no-console */
console.log( `
----------------------------
=> Starting Server...'
=> Environment: ${ process.env.NODE_ENV }
----------------------------
` );

app.listen( app.get( 'port' ) );
