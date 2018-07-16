import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Table, Icon, Divider, Row, Col } from 'antd';
import * as actions from 'myRedux/action';

import { userListColumn } from '../../config/adminMenus';

class UserList extends Component {
	constructor(props) {
		super(props); 
		this.state = {
			val: []
		}
	}

	handleDataEdit() {
		alert(1)
	}

	componentDidMount() {
		if (this.props.userList.data.length <= 0) {
			this.props.getUserList(this.props.userList.filter);
		}
		this.props.setAdminTitle({
			title: '系统管理',
			subTitle: "协管员列表",
			openKeys: ['sub-0'],
			selectedKeys: ['item-0']
		});
	}

	componentWillUpdate(nextProp) {
		return nextProp.userList.data !== this.props.userList.data;
	}

	render() {
		let columns = userListColumn(this);
		// let data = [{_id: '1', name: 'xu', company: '杭为', department: '1212', phone: '12121', username: 'username', power: ['admin', 'manage']}]
		return (
			<div className="table-list">
				<Row>
					<Col span="24" className="list-top-opt">
						<Link to="/admin/userAdd">
							<Icon type="plus-circle" className="opt-icon"/>
						</Link>
					</Col>
				</Row>
				<Table 
					columns={columns} 
					dataSource={this.props.userList.data} 
					rowKey="_id" 
					loading={this.props.userList.state == 'loading'}/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		userList: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getUserList: () => {
			dispatch(actions.getUser());
		},

		setAdminTitle: (obj) => {
			dispatch(actions.setTitle(obj))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(UserList);