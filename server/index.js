require( 'dotenv' ).config();
const path = require( 'path' );
const express = require( 'express' );

const App = require( '../public/server/main.js' );

const app = express();
const env = process.env.NODE_ENV;
const port = parseInt( process.env.PORT, 10 ) || 9000;
const appConfig = {
	env,
	siteUrl: process.env.WP_URL,
	blogPrefix: process.env.BLOG_PREFIX || '/blog',
	entryMetaTaxonomies: ( process.env.ENTRY_META_TAX || '' ).split( ',' ) || [],
};

const manifestPath = '../public/client/assets/manifest.json';
let manifest;

if ( env === 'production' ) {
	// On production, the manifest is already created, as real file so just require() it.
	manifest = require( manifestPath );
} else {
	const webpack = require( 'webpack' );
	const config = require( '../config/webpack/client' )( 'development' );
	const compiler = webpack( config );
	const devMiddleware = require( 'webpack-dev-middleware' )( compiler, {
		noInfo: true,
		publicPath: config.output.publicPath,
	} );
	const hotMiddleware = require( 'webpack-hot-middleware' )( compiler );

	app.use( devMiddleware );
	app.use( hotMiddleware );
	app.use( ( req, res, next ) => {
		// On development, the manifest only exists in memory.
		manifest = JSON.parse(
			compiler.outputFileSystem.readFileSync( path.join( __dirname, manifestPath ) ),
			'utf8',
		);
		next();
	} );
}

// Bootstrap application settings.
app.set( 'port', port );
// X-Powered-By header has no functional value.
// Keeping it makes it easier for an attacker to build the site's profile
// It can be removed safely
app.disable( 'x-powered-by' );
app.set( 'view cache', false );
app.use( express.static( path.join( __dirname, '..', 'public', 'client' ) ) );

// Routing.
app.get( '*', ( req, res, next ) => App.default( appConfig, manifest, req, res, next ).catch( next ) );
app.use( ( error, req, res ) => res.status( 500 ) );

/* eslint-disable-next-line no-console */
console.log( `
----------------------------
=> Starting Server...
=> Environment: ${ env }
=> Port: ${ port }
----------------------------
` );

app.listen( port );
