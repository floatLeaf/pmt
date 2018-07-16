var path = require('path');

module.exports = {
	server: {
		port: 7000,
		url: 'http://localhost:7000',
		dburl: 'mongodb://127.0.0.1:27017/pmt',
		session_secret: 'pmt',
	},
 
	APP_PATH: path.resolve(__dirname, '../src'),
	APP_FILE: path.resolve(__dirname, '../src/app'),
	BUILD_PATH: path.resolve(__dirname, '../public'),

	devport: 5000,
	dev: { 
		context: [ // 代理路径
	         '/api',
	    ],
	}
}