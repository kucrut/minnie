const path = require( 'path' );
const autoprefixer = require( 'autoprefixer' );
const postcssFlexbugsFixes = require( 'postcss-flexbugs-fixes' );
const ManifestPlugin = require( 'webpack-manifest-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

function getCssLoaders( isProduction, isServer = false ) {
	if ( isServer ) {
		return [ {
			loader: 'ignore-loader',
		} ];
	}

	return [
		( isProduction
			? MiniCssExtractPlugin.loader
			: { loader: 'style-loader' }
		),
		{
			loader: 'css-loader',
			options: {
				importLoaders: 1,
				sourceMap: true,
			},
		},
		{
			loader: 'clean-css-loader',
			options: isProduction
				? {
					level: 2,
					inline: [ 'remote' ],
					format: {
						wrapAt: 200,
					},
				}
				: { level: 0 },
		},
		{
			loader: 'postcss-loader',
			options: {
				ident: 'postcss',
				plugins: [
					postcssFlexbugsFixes,
					autoprefixer( {
						browsers: [
							'>1%',
							'last 4 versions',
							'Firefox ESR',
							'not ie < 10',
						],
						flexbox: 'no-2009',
					} ),
					require( 'postcss-nested' ),
				],
			},
		},
	].filter( Boolean );
}

/**
 * Get shared config
 *
 * @param {string}  env      Environment.
 * @param {boolean} isServer Whether to get configuration for server or client.
 *
 * @return {Object}
 */
module.exports = function getSharedConfig( env, isServer = false ) {
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
				test: /\.css$/,
				// NOTE: Order is important.
				use: getCssLoaders( isProduction, isServer ),
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
		plugins: [
			( ! isServer && new ManifestPlugin( {
				fileName: 'client-manifest.json',
				writeToFileEmit: true,
			} ) ),
			( isProduction && new MiniCssExtractPlugin( {
				filename: '[name].css',
			} ) ),
		].filter( Boolean ),
	};

	return config;
}
