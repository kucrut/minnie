const path = require( 'path' );

/**
 * Get shared config
 *
 * @param {string} env Environment.
 *
 * @return {Object}
 */
function getSharedConfig( env ) {
	const cwd = process.cwd();
	const isProduction = env === 'production';

	let config = {
		mode: env,
		context: cwd,
		devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',
		resolve: {
			extensions: [ '.js', '.json' ],
		},
		output: {
			// The output directory as absolute path.
			path: path.join( cwd, 'public', 'assets' ),
			// The filename of the entry chunk as relative path inside the output.path directory.
			filename: '[name].js',
			// The output path from the view of the JavaScript.
			publicPath: '/assets/',
		},
		module: {
			strictExportPresence: true,
			rules: [ {
				test: /\.html$/,
				loader: 'html-loader',
			}, {
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /(node_modules|bower_components)/,
				options: {
					babelrc: false,
					cacheDirectory: true,
					presets: [
						[ '@babel/preset-env', {
							modules: false,
							targets: {
								browsers: [
									'extends @wordpress/browserslist-config',
								],
							},
						} ],
					],
					plugins: [
						'@babel/plugin-proposal-class-properties',
						'@babel/plugin-proposal-object-rest-spread',
						'@babel/plugin-transform-react-jsx',
						[ '@babel/plugin-transform-runtime', {
							corejs: 2,
							helpers: true,
							useESModules: false,
						} ],
						( ! isProduction && 'react-hot-loader/babel' ),
					].filter( Boolean ),
				},
			}, {
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
				loader: 'url-loader',
				query: {
					name: '[name].[ext]',
					limit: 10000,
				},
			}, {
				// Exclude all extensions that have their own loader.
				exclude: [
					/\.p?css$/, /\.sass$/, /\.scss$/,
					/\.html$/, /\.json$/, /\.jsx?$/,
					/\.png$/, /\.jpe?g$/, /\.gif$/, /\.svg$/,
					/\.woff$/, /\.woff2$/, /\.eot$/, /\.ttf$/,
				],
				loader: 'file-loader',
			} ],
		},
		performance: {
			assetFilter: assetFilename => ! ( /\.map$/.test( assetFilename ) ),
		},
	};

	return config;
}

module.exports = getSharedConfig;
