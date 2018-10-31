/**
 * Routes for express
 */
const App = require( '../../public/assets/server.js' );

// This is where the magic happens. We take the locals data we have already
// fetched and seed our stores with data.
// App is a function that requires store data and url to initialize and return
// the React-rendered html string.
module.exports = app => app.get( '*', ( ...args ) => App.default( ...args ) );
