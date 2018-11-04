const webpack = require( 'webpack' );
const merge = require( 'webpack-merge' );
const getSharedConfig = require( './shared' );

module.exports = env => merge( getSharedConfig( env ), {
	name: `browser-${ env }`,
	// Multiple entry with hot loader
	// https://github.com/glenjamin/webpack-hot-middleware/blob/master/example/webpack.config.multientry.js
	entry: {
		app: [
			'./src/client',
			'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin( {
			__DEVCLIENT__: true,
			__DEVSERVER__: false,
		} ),
	],
} );
