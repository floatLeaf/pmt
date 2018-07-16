"use strict";
const config = require('../config');
const path = require('path');
const opn = require('opn');
var express = require('express');
var proxyMiddleware = require('http-proxy-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.base.config');

// 解决使用html5History时，刷新页面报404错误的问题
var connectHistory = require('connect-history-api-fallback');
var port = config.devport;
var app = express();
var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	hot: true,
    stats: {
    	all: false,
        colors: true,
        assets: true,
        errors: true
    }
});

var hotMiddlewear = require("webpack-hot-middleware")(compiler);
 
var context = config.dev.context;
var options = {
	target: config.server.url, // 代理指向
	changeOrigin: true
};

if (context.length > 0) {
	app.use(proxyMiddleware(context, options));
}
app.use(connectHistory());  // 需要放在devMiddleware 、hotMiddlewear之前
app.use(devMiddleware);
app.use(hotMiddlewear);

// app.use(connectHistory({ rewrites: [ { from: /^\/abc$/, to: '/' } ] })); 


// 静态资源路径
var staticPath = config.BUILD_PATH
app.use(staticPath, express.static('../'));

app.listen(port, function(err) {
	if (err) {
		return console.log(err);
	}

	var url = 'http://localhost:' + port;
	console.log('server is running, listening at ' + port);

	// when env is testing, don't need open it
    if (process.env.NODE_ENV !== 'testing') {
        opn(url)
    }
})