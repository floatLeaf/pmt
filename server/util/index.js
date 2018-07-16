let siteFun = {
	UserException: function(msg) {
		this.state = 'error';
		this.message = msg;
	}
};

module.exports = siteFun;