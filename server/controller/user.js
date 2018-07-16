var UserModel = require('../model').User;
var formidable = require('formidable');
var validator = require('validator');
var siteFun = require('../util');

//创建用户表单校验
function validateUser(fields) {
	let msg = '';

	if (validator.isEmpty(fields.name)) {
		msg = '姓名不能为空！';
	} else if (validator.isEmpty(fields.department)) {
		msg = '部门不能为空！';
	} else if (!validator.isMobilePhone(fields.phone, 'zh-CN')) {
		msg = '手机号码格式错误';
	} else if (validator.isEmpty(fields.wechat)) {
		msg = '微信号不能为空';
	} else if (validator.isEmpty(fields.username)) {
		msg = '登录帐号不能为空';
	} else if (!validator.isMD5(fields.password)) {
		msg = '密码格式错误';
	}

	if (msg) {
		throw new siteFun.UserException(msg);
	}
} 

function validLogin(fields) {
	let msg = '';
	if (validator.isEmpty(fields.username)) {
		msg = '登录帐号不能为空';
	} else if (!validator.isMD5(fields.password)) {
		msg = '密码格式错误';
	}

	if (msg) {
		throw new siteFun.UserException(msg);
	}
}

class User {

	/**
	 * 新增协管员
	 * @author [xu]
	 * @date   [2018-07-05]  
	 */
	userAdd(req, res, next) {
		let form = new formidable.IncomingForm();

		form.parse(req, async (err, fields, files) => {
			try {
				validateUser(fields);
			} catch (e) {
				res.send({
					state: e.state,
					msg: e.message
				});
				return;
			} 

			let data = {
				name: fields.name,
				company: fields.company,
				department: fields.department,
				phone: fields.phone,
				wechat: fields.wechat,
				username: fields.username,
				password: fields.password,
				power: fields.power,
				is_out: fields.is_out,
				project: fields.project
			};

			try {
				let obj = await UserModel.findOne({username: data.username});
				if (obj) {
					res.send({ state: 'error', msg: '帐号已存在' });
					return;
				}
				let user = new UserModel(data);
				user.save();
				res.send({ state: 'success', msg: '帐号创建成功！'});
			} catch (e) {
				res.send({ state: 'error', msg: e.message });
			}
		});
	}

	/**
	 * 获取协管员列表
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	async userList(req, res, next) {
		let filter = req.filter;
		try {
			let doc = await UserModel.find({power: 'manage', ...filter}, {password: 0});
			res.send({ 
				state: 'success', 
				data: doc, 
				msg: '获取数据成功'
			});
		} catch(e) {
			res.send({ 
				state: 'error', 
				msg: e.message || '获取数据失败'
			});
		}  
	}

	/**
	 * 检测登录帐号是否注册
	 * @autor  [xu]
	 * @date   [2018-07-05]  
	 */
	usernameValid(req, res, next) {
		let username = req.query.username;

		if (!username) {
			res.send({ state: 'error', msg: '请求参数缺失' });
			return;
		}

		try {
			let doc = UserModel.findOne({username});
			if (doc) {
				res.send({ state: 'error', msg: '登录帐号已存在！'});
			} else {
				res.send({ state: 'success', msg: '帐号未注册！'});
			}
		} catch(e) {
			res.send({ state: 'error', msg: e.message });
		}
	}

	login(req, res, next) {
		let form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			try {
				validLogin(fields);
			} catch(e) {
				res.send({ state: 'error', msg: e.message });
				return;
			}

			let data = {
				username: fields.username,
				password: fields.password
			};

			try {
				let doc = await UserModel.findOne(data);
				if (doc) {
					req.session.userInfo = doc;
					req.session.adminlogin = true;
					res.send({ state: 'success', msg: '登录成功'});
					return;
				}
				res.send({ state: 'error', msg: '用户名或密码失败'}); 
			} catch(e) {
				res.send({ state: 'error', msg: e.message }); 
			} 
		});
	}

	logout(req, res, next) {
		req.session.userInfo = null;
		req.session.adminlogin = false;
		res.send({ state: 'success', msg: '退出登录成功'}); 
	}
}

module.exports = new User();