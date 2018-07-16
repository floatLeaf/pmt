import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Table, Pagination, message } from 'antd'; 
import * as actions from 'myRedux/action';
import UserAdd from './userAdd';
 
class UserList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			defaultSize: 20, 
			page: 1,
			selectedRowKeys: [],
			showAddModal: false, 
			editkey: -1, // 当前编辑的用户键值， -1表示没有编辑
		}

		this.toggleModal = this.toggleModal.bind(this);
		this.onSelectChange = this.onSelectChange.bind(this);
	}

	componentDidMount() { 
		this.props.setTitle({title: '系统管理', subTitle: '用户管理'});
		this.props.setOpenKeys(['sub-0']);
 		this.props.setSelectedKeys(['item-0']);
		if (this.props.adminUser.state != 'success') {
			this.props.getAdminUser();
		} 

		if (this.props.adminGroup.state != 'success') {
			this.props.getAdminGroup();
		}     
	}

	componentWillUpdate(nextProps, nextState) { 
		return this.props.adminUser == nextProps.adminUser &&
			   this.props.adminGroup == nextProps.adminGroup &&
			   this.state == nextState; 
	}

	handleDataDel() {
		alert('delete')
	}

	handleDataEdit(key) {
		this.setState({editkey: key});
		this.setState({showAddModal: true});
	}

	handlePageChange(page) {
		this.setState({page})
		this.props.getAdminUser({page, size: this.state.defaultSize});
	}

	onSelectChange(selectedRowKeys) { 
		this.setState({selectedRowKeys});
	}

	toggleModal(status, state) {
		this.setState({showAddModal: status, editkey: -1});

		if (state === 'success') {
			this.props.getAdminUser({page, size: this.state.defaultSize});
		}
	}

	render() {
		let userListColumn = [
			{
				title: '用户名',
				dataIndex: 'userName',
				key: 'userName'
			}, {
				title: '用户类型',
				dataIndex: 'group',
				key: 'group'
			}, {
				title: '姓名',
				dataIndex: 'name',
				key: 'name',
			}, {
				title: '手机号',
				dataIndex: 'phoneNum',
				key: 'phoneNum'
			}, {
				title: '邮箱',
				dataIndex: 'email',
				key: 'email'
			}, {
				title: '是否有效',
				dataIndex: 'enable',
				key: 'enable',
				render: (text) => {
					return text ? '有效' : '无效';
				}
			}, {
				title: '操作', 
				key: 'action',
				render: (text, record, key) => { 
					return (
						<div className="td-opt">
							<a onClick={this.handleDataEdit.bind(this, key)}><Icon type="edit" /></a>
							<a className="warn" onClick={this.handleDataDel.bind(this, key)}><Icon type="delete" /></a>  
						</div>
					)
				}
			}
		];
		
		const rowSelection = {
			selectedRowKeys: '_id',
			selectedRowKeys: this.state.selectedRowKeys,
			onChange: this.onSelectChange
		};

		return (
			<div>
				<div className="user-list">
					<Row>
						<Col span="24" className="list-top-opt">
							<Icon type="plus-circle" className="opt-icon" onClick={() => {this.toggleModal(true)}} />
						</Col>
					</Row>

					<div className="table-wrap">
						<Table rowKey="_id"
							   dataSource={this.props.adminUser.data}
							   rowSelection={rowSelection} 
							   columns={userListColumn} 
							   pagination={false}  /> 

						<div className="pagination-wrap">
							<Pagination 
								showQuickJumper 
								onChange={this.handlePageChange.bind(this)} 
								defaultPageSize={1} 
								defaultCurrent={1} 
								total={this.props.adminUser.total} />
						</div>
					</div>
				</div>

				<UserAdd userData={this.props.adminUser.data[this.state.editkey]} visible={this.state.showAddModal} toggleModal={this.toggleModal} group={this.props.adminGroup.data} />
			</div>
		)
	}
}

function mapStateToProps(state) {
	let { adminUser, adminGroup } = state;

	return {
		adminUser,
		adminGroup
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getAdminUser: (data) => {
			dispatch(actions.getAdminUser(data))
		},

		getAdminGroup: () => {
			dispatch(actions.getAdminGroup())
		},

		setTitle: (data) => {
			dispatch(actions.setTitle(data))
		},

		setOpenKeys: (data) => {
			dispatch(actions.setOpenKeys(data))
		},

		setSelectedKeys: (data) => {
			dispatch(actions.setSelectedKeys(data))
		}
	} 
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);