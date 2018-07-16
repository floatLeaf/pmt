var mongoose = require('mongoose');
var config = require('../../config');

mongoose.connect(config.server.dburl);
let connection = mongoose.connection;

connection.on('open', function() {
	console.log('数据库链接成功！');
});

connection.on('error', (err) => {
	console.log('数据库链接出错：' + err);
});

connection.on('close', () => {
	console.log('数据库链接断开');
});