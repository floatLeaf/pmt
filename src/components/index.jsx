import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Breadcrumb, Alert, Button } from 'antd';
import Immutable, { isImmutable } from 'immutable';

import { saveUser, removeUser } from 'myRedux/action/userAction';
import store from 'src/redux/store';

import axios from 'axios';

console.log('userAction', saveUser, removeUser);
 
class Index extends Component {

	constructor(props) {
		super(props);

		this.rebackUser = this.rebackUser.bind(this);
	}

	state = {
		loading: false
	}

	// static propTypes = {
	// 	text: PropTypes.string
	// };
	
	createUser() {
		let obj = {name: 'wang', friends: ['xu', 'hu']};
		this.props.saveUser(obj);

		setTimeout(() => {
			obj.name = 'sss';
			console.log(store.getState())
		}, 10000)
	}

	rebackUser() {
		this.props.removeUser();
	}

	componentDidMount() {
		let obj = {
			a: 1,
			b: {c: 1}
		};

		let newObj = Immutable.fromJS(obj)
		let b = newObj.get('b');

		axios({
			method: 'get',
		  	url: '/btc1',
		  	timeout: 100000
		})
		.then(res => {
			if (res.status == 200) {
				console.log(res.data);
			} else { 
			}
		})
		.catch(() => {
			 
		});
	}

	componentWillReceiveProps(nextProps) {
		console.log('this.porps', this.props.user);
		console.log('next.porps', nextProps.user);
	}

	render() {
		return (
			<div> 
				<h1>hello word, {this.props.user.name}</h1>

				<Button type="primary" loading={this.state.loading} onClick={this.createUser.bind(this)}>Click me!</Button>
				<Button type="primary" onClick={this.rebackUser}>remove user</Button>
			</div>
		)
	}
}

function mapStateToProps(state) {
	let {user} = state; 
	return {
		user: user
	}
}
 
let mapDispatchToProps = {
	saveUser, 
	removeUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);