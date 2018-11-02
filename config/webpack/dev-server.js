const webpack = require( 'webpack' );
const merge = require( 'webpack-merge' );
const getSharedConfig = require( './shared' );

module.exports = env => {
	const config = merge( getSharedConfig( env ), {
		name: 'server-dev',
		entry: {
			server: './app/server',
		},
		target: 'node',
		output: {
			libraryTarget: 'commonjs2',
		},
		plugins: [
			new webpack.DefinePlugin( {
				__DEVCLIENT__: false,
				__DEVSERVER__: true,
			} ),
		],
	} );

	return config;
};
