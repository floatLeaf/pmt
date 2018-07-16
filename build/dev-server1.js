var webpack = require('webpack');
var webpackConfig = require('./webpack.base.config');
var WebpackDevServer = require('webpack-dev-server');
var api = require('../server/routes/api');
var config = require('../config');

var compiler = webpack(webpackConfig);

var server = new WebpackDevServer(compiler, {
	publicPath: webpackConfig.output.publicPath,
	stats: {
		all: false,
		assets: true,
		assetsSort: "!field",
		colors: true,
		errors: true
	},
	open: true,
	proxy: [{
      	context: ['/api'],
      	target: 'http://localhost:' + config.server.port,
    }] 
});


server.listen(config.devport)

