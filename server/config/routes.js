/**
 * Routes for express app
 */
var path = require( 'path' );
var compiled_app_module_path = path.resolve( __dirname, '../../', 'public', 'assets', 'server.js' );
var App = require( compiled_app_module_path );

module.exports = function( app ) {
	// This is where the magic happens. We take the locals data we have already
	// fetched and seed our stores with data.
	// App is a function that requires store data and url to initialize and return the React-rendered html string
	app.get( '*', function ( req, res ) {
		App.default( req, res );
	});
};
