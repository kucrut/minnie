const webpack = require( 'webpack' );
const merge = require( 'webpack-merge' );
const getSharedConfig = require( './shared' );

module.exports = env => {
	const config = merge( getSharedConfig( env, true ), {
		name: `server-${ env }`,
		entry: {
			server: './src/server',
		},
		target: 'node',
		output: {
			filename: '[name].js',
			libraryTarget: 'commonjs2',
		},
		plugins: [
			new webpack.DefinePlugin( {
				__DEVCLIENT__: false,
				__DEVSERVER__: env === 'development',
			} ),
		],
	} );

	return config;
};
