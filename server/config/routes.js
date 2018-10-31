/**
 * Routes for express
 */
const path = require( 'path' );
const compiled_app_module_path = path.resolve( __dirname, '../../', 'public', 'assets', 'server.js' );
const App = require( compiled_app_module_path );

// This is where the magic happens. We take the locals data we have already
// fetched and seed our stores with data.
// App is a function that requires store data and url to initialize and return
// the React-rendered html string.
module.exports = app => app.get( '*', ( ...args ) => App.default( ...args ) );
