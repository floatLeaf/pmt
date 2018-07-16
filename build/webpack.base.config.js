var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer')

var config = require('../config');

const postcssLoader = {
	loader: 'postcss-loader',
	options: {
		plugins: (loader) => [
			autoprefixer({
				browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
			}) 
		]
	}
};

module.exports = { 
	mode: 'development', 
	devtool: 'source-map', // or 'inline-source-map'
	entry: { 
		common: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-thunk', 'prop-types'],
		main: ['webpack-hot-middleware/client?name=app&reload=true', config.APP_FILE]
	},

	output: {
		filename: 'javascripts/[name].js',
		chunkFilename: 'javascripts/[name].js',
		path: config.BUILD_PATH,
		publicPath: '/' 
	},

	module: {
		rules: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: 'babel-loader',
				include: [config.APP_PATH]
			},

			{
				test: /\.(jpg|png|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192
					}
				}]
			},

			{
				test: /\.less$/i,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', postcssLoader, 'less-loader']
				}),
				include: [config.APP_PATH]
			},

			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', postcssLoader, 'sass-loader']
				}),
				include: [config.APP_PATH]
			},

			{
				test: /\.css$/i,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', postcssLoader]
				})
			} 
		] 
	},

	resolve: {
		modules: [path.join(__dirname, '../node_modules')],
		extensions: ['*', '.web.js', '.jsx', '.js', '.json'],
		alias: {
			public: path.resolve(__dirname, '../public/'),
			components: path.resolve(__dirname, '../src/components/'),
			myRedux: path.resolve(__dirname, '../src/redux/'),
			src: path.resolve(__dirname, '../src/'),
			assets: path.resolve(__dirname, '../src/assets/'),
			antd: path.resolve(__dirname, '../node_modules/antd')
		}
	},

	plugins: [
		// new webpack.DefinePlugin({
		// 	'process.env': {
		// 		NODE_ENV: JSON.stringify('development') //定义编译环境
		// 	}
		// }),

		new webpack.DefinePlugin({
		    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}),

		new HtmlWebpackPlugin({
			// filename: '../views/index.html', // 相对与BUILD_PATH
			filename: 'index.html', // 相对与BUILD_PATH
			template: path.resolve(config.APP_PATH, './index.html')
		}),

		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'common',
		// 	filename: 'javascripts/common.min.js'
		// }),

		new webpack.HotModuleReplacementPlugin(), //热加载插件

		new ExtractTextPlugin({
			filename: 'stylesheets/[name].css',
			allChunks: true
		})
	],

	// webpack.optimize.CommonsChunkPlugin被废弃了，用这个代替。 https://webpack.js.org/plugins/split-chunks-plugin/
	optimization: {
	    splitChunks: {
		 	cacheGroups: {
		        common: {
		          	name: 'common',
		          	chunks: 'initial',
		          	minChunks: 2
		        }
		 	}
	    }
	} 
};



