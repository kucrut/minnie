var path = require( 'path' );
var webpack = require( 'webpack' );
var assetsPath = path.join( __dirname, '..', 'public', 'assets' );
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

var commonLoaders = [{
	/*
	* TC39 categorises proposals for babel in 4 stages
	* Read more http://babeljs.io/docs/usage/experimental/
	*/
	test: /\.js$|\.jsx$/,
	loader: 'babel',
	// Reason why we put this here instead of babelrc
	// https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
	query: {
		presets: ['react-hmre', 'es2015', 'react', 'stage-0']
	},
	include: path.join( __dirname, '..', 'app' ),
	exclude: path.join( __dirname, '/node_modules/' )
}, {
	test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
	loader: 'url',
	query: {
		name: '[hash].[ext]',
		limit: 10000,
	}
}, {
	test: /\.html$/,
	loader: 'html-loader'
}, {
	test: /\.json$/,
	loader: 'json-loader'
}];

module.exports = {
	// eval - Each module is executed with eval and //@ sourceURL.
	devtool: 'eval',
	// The configuration for the client
	name: 'browser',
	context: path.join( __dirname, '..', 'app' ),
	// Multiple entry with hot loader
	// https://github.com/glenjamin/webpack-hot-middleware/blob/master/example/webpack.config.multientry.js
	entry: {
		app: ['./client', hotMiddlewareScript]
	},
	output: {
		// The output directory as absolute path
		path: assetsPath,
		// The filename of the entry chunk as relative path inside the output.path directory
		filename: '[name].js',
		// The output path from the view of the Javascript
		publicPath: '/assets/'
	},
	module: {
		loaders: commonLoaders.concat([{
			test: /\.css$/,
			loader: 'style-loader!css-loader?importLoaders=1'
		} ])
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.css'],
		modulesDirectories: ['app', 'node_modules']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			__DEVCLIENT__: true,
			__DEVSERVER__: false
		})
	]
};
