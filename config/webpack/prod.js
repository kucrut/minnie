const merge = require( 'webpack-merge' );
const webpack = require( 'webpack' );

const clientConfig = require( './client' );
const serverConfig = require( './server' );

const plugins = [
	new webpack.DefinePlugin( {
		__DEVCLIENT__: false,
		__DEVSERVER__: false,
	} ),
];

module.exports = env => ( [
	merge( clientConfig( env ), { plugins } ),
	merge( serverConfig( env ), { plugins } ),
] );
