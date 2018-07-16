const express = require('express');
const router = express.Router();
let user = require('../controller/user');

function isAdminLogin (req, res, next) {
	if (!req.session.adminlogin) {
		res.send({ state: 'error', msg: 'tokenExprise'});
		return;
	}

	next();
}

router.post('/userAdd', isAdminLogin, user.userAdd);
router.get('/userList', isAdminLogin, user.userList);
router.post('/login', user.login); 
router.get('/logout', user.logout); 

module.exports = router;