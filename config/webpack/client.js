const path = require( 'path' );
const webpack = require( 'webpack' );
const merge = require( 'webpack-merge' );
const getSharedConfig = require( './shared' );

module.exports = env => {
	const isProduction = env === 'production';

	return merge( getSharedConfig( env ), {
		name: `browser-${ env }`,
		// Multiple entry with hot loader
		// https://github.com/glenjamin/webpack-hot-middleware/blob/master/example/webpack.config.multientry.js
		output: {
			path: path.join( process.cwd(), 'public', 'client', 'assets' ),
			filename: '[name].[hash].js',
			publicPath: '/assets/',
		},
		entry: {
			main: [
				'./src/client',
				( ! isProduction && 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false' ),
			].filter( Boolean ),
		},
		plugins: [
			( ! isProduction && new webpack.HotModuleReplacementPlugin() ),
			new webpack.DefinePlugin( {
				__DEVCLIENT__: ! isProduction,
				__DEVSERVER__: false,
			} ),
		].filter( Boolean ),
	} );
}
