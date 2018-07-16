const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
	name: String,
	company: String,
	department: String,
	phone: Number,
	wechat: String,
	username: String,
	password: String,
	power: {
		type: Array,
		default: [], // manage => 管理员， admin => 拥有创建协管员的权限
	},
	is_out: Number, // 0 在职 1 离职
	create_time: {
		type: Date,
		default: Date.now
	},
	project: {
		type: [Schema.Types.ObjectId],
		ref: 'Project'
	}
});

let User = mongoose.model('user', userSchema);
module.exports = User;