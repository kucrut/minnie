const express = require( 'express' );
const webpack = require( 'webpack' );
const app = express();

const isDev = process.env.NODE_ENV === 'development';

if ( isDev ) {
	const config = require( '../config/webpack/dev-client.js' );
	const compiler = webpack( config );
	const devMiddleware = require( 'webpack-dev-middleware' )( compiler, {
		noInfo: true,
		publicPath: config.output.publicPath,
	} );
	const hotMiddleware = require( 'webpack-hot-middleware' )( compiler );

	app.use( devMiddleware );
	app.use( hotMiddleware );
}

// Bootstrap application settings
require( './config/express' )( app );
require( './config/routes' )( app );

app.listen( app.get( 'port' ) );
