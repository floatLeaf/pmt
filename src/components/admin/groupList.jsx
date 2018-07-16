import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, Icon, message } from 'antd';

import { axiosGet } from 'src/config';
import * as action from 'myRedux/action';
import GroupAdd from './groupAdd';

class GroupList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visableModal: false,
			editkey: -1,
		};

		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
	}

	closeModal(state) {
		this.setState({visableModal: false});

		if (state == 'success') {
			this.props.getAdminGroup();
		}
	}

	openModal() {
		this.setState({visableModal: true});
	}

	handleDataEdit(key) {
		this.setState({editkey: key, visableModal: true });
	}

	async handleDataDel(id) {
		let res = await axiosGet('/admin/adminGroupDel', {_id: id});

		if (res.state == 'success') {
			this.props.getAdminGroup();
			message.success(res.msg);
			return;
		}

		message.error(res.msg);
	}

	componentWillMount() {
		this.props.setTitle({title: '系统管理', subTitle: '角色管理'});
		this.props.setOpenKeys(['sub-0']);
 		this.props.setSelectedKeys(['item-1']);

		if (this.props.adminGroup.state !== 'success') {
			this.props.getAdminGroup();
		} 
	}

	componentWillUpdate(nextProps, nextState) {  

		return this.props.adminGroup == nextProps.adminGroup &&
			   this.state == nextState; 
	}

	render() {
		let columns  = [
			{
				title: '角色名',
				dataIndex: 'name'
			}, {
				title: '角色描述',
				dataIndex: 'comment',
				width: 500
			}, {
				title: '操作',
				width: 150,
				render: (text, record, index) => { 
					return (
						<div className="td-opt">
							<a onClick={this.handleDataEdit.bind(this, index)}><Icon type="edit" /></a>
							<a className="warn" onClick={this.handleDataDel.bind(this, text._id)}><Icon type="delete" /></a>  
						</div>
					)
				}
			}
		];


		return (
			<div>
				<div className="table-list">
					<Row>
						<Col span="24" className="list-top-opt">
							<Icon type="plus-circle" className="opt-icon" onClick={this.openModal} />
						</Col>
					</Row>

					<div className="table-wrap">
						<Table rowKey="_id"
							   dataSource={this.props.adminGroup.data} 
							   columns={columns}
							   pagination={false}  />  
					</div>
				</div>

				<GroupAdd 
					groupData={this.props.adminGroup.data[this.state.editkey]} 
					visible={this.state.visableModal} 
					handleCancel={this.closeModal} />

			</div>
		)
	}
}  

let mapStateToProps = (state) => {

	let { adminGroup } = state;

	return {
		adminGroup
	}
}  

let { getAdminGroup, setOpenKeys, setSelectedKeys, setTitle } = {...action}
let mapDispatchToProps = {
	getAdminGroup,
	setOpenKeys,
	setSelectedKeys,
	setTitle
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);