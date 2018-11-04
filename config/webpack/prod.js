const clientConfig = require( './client' );
const serverConfig = require( './server' );

module.exports = env => ( [
	clientConfig( env ),
	serverConfig( env ),
] );
