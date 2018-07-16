import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Row, Col, Dropdown, Modal } from 'antd';
import { Link } from 'react-router';

import * as actions from 'myRedux/action';
import { adminMenus } from 'src/config/adminMenus';

const { Header, Sider, Content } = Layout; 
const { SubMenu, Item } = Menu;  

import { axiosPost, axiosGet } from 'src/config';

class Index extends Component {
 	constructor(props) {
 		super(props);

 		this.state = {  
 		};

 		this.handelClickLogo = this.handelClickLogo.bind(this);
 		this.selectItem = this.selectItem.bind(this);
 		this.onTitleClick = this.onTitleClick.bind(this);
 		this.adminLogout = this.adminLogout.bind(this);
 	} 

 	componentWillReceiveProps(nextProp) {
 		let adminAuthToken = nextProp.adminAuthToken;
 		 
 		// 用户身份信息过期
 		if (this.props.adminAuthToken.msg !== adminAuthToken.msg && adminAuthToken.state == 'error' && adminAuthToken.msg.indexOf('token') >= 0) {
 			Modal.warning({
 				className: 'warning-token',
			    title: '用户验证失败',
			    content: '用户信息已过期，请重新登录！',
			    okText: '确认',
			    onOk: () => {
			    	this.props.initAllState();
			    	this.props.router.push('/admin/login?back=1');
			    }
			});
 		}
 	}

 	componentDidMount() {
 		console.log(this.props.route)
 	}

 	handelClickLogo() {
 		this.props.resetAdminTitle(); 
 		this.props.setOpenKeys([]);
 		this.props.setSelectedKeys([]);
 	}

 	selectItem() { 
 		let { key } = {...arguments[0]}; 
 		this.props.setSelectedKeys([key]);
 	}

 	onTitleClick() {  
 		let { key } = {...arguments[0]}; 
 		if (key == this.props.adminIndex.openKeys[0]) {
 			this.props.setOpenKeys(['none']);
 			return;
 		}

 		// none表示从open => 关闭， 此时重新打开， selectedKeys不变化
 		if (this.props.adminIndex.openKeys[0] !== 'none') {
 			this.props.setSelectedKeys(['item-0']); 
 		} 
 		this.props.setOpenKeys([key]); 
 	}


 	async adminLogout() {
 		let res = await axiosGet('/logout');
 
 		if (res.state == 'success') {
 			this.props.initAllState();
 			this.props.router.push('/admin/login');
 		}
 	}

 	render() { 
 		let { adminLogout } = this;
 		let userMenuProps = { adminLogout };
 		const UserMenu = (props) => { 
 			return (
 				<Menu>
				    <Item><div>我的消息</div></Item> 
				    <Item><div>设置</div></Item> 
				    <Item style={{'borderTop': '1px solid #e8e8e8', 'paddingTop': '10px'}} onClick={props.adminLogout}><div>退出登录</div></Item> 
				</Menu>
 			)
 		}

 		let headerPaddingStyle = {paddingLeft: '20px', paddingRight: '20px'};
 		let contentrPaddingStyle = {paddingLeft: '20px', paddingRight: '20px', paddingTop: '20px'};

 		return ( 
			<Layout className="admin-index-wrap">
				<Sider className="bg-white" width={210} style={{'borderRight': '1px solid #e8e8e8'}}>
					<Link to={'/admin'} className="logo" onClick={this.handelClickLogo}>
						<img src={require('assets/images/logo.png')} alt="logo" />
					</Link>

					<Menu theme="light" 
						  mode="inline"   
						  openKeys={this.props.adminIndex.openKeys} 
						  style={{'borderRight': 'none'}} 
						  selectedKeys={this.props.adminIndex.selectedKeys} >

						{
							adminMenus.map((menu, n) => {

								return (
									<SubMenu key={'sub-' + n} title={menu.title} onTitleClick={this.onTitleClick}>
										{
											menu.items.map((item, i) => {
												return (
													<Item key={'item-' + i} onClick={this.selectItem}>
														<Link to={item.link}>{item.text}</Link>
													</Item>
												) 
											}) 
										}
									</SubMenu>
								)
							})
						}
					</Menu>
				</Sider>

				<Layout className="bg-white">
					<Header className="bg-white" style={headerPaddingStyle}>
						<Row>
							<Col span={12}></Col>
							<Col span={12} className="align-right">
								<Dropdown overlay={UserMenu(userMenuProps)}>
									<a className="ant-dropdown-link" style={{display: 'inline-block', height: '100%'}}>
										userName
										<img className="default-logo" src={require('assets/images/defaultlogo.png')} />
									</a>
								</Dropdown>
							</Col>
						</Row>
					</Header>
					<Content className="bg-white" style={contentrPaddingStyle}>
						<Row>
							<Col span={12}><b>{this.props.adminIndex.subTitle}</b></Col>
							<Col span={12} className="align-right">
								{this.props.adminIndex.title} <span style={{padding: '0 4px'}}>/</span> {this.props.adminIndex.subTitle} 
							</Col> 
						</Row>

						{this.props.children }
					</Content>
				</Layout>
			</Layout> 
 		)
 	}
}

function mapStateToProps(state) {
	let { adminIndex, adminAuthToken } = state;
	return {
		adminIndex,
		adminAuthToken
	}
} 

let mapDispatchToProps = (dispatch) => {
	return { 
		resetTitle: () => {
			dispatch(actions.resetTitle())
		},

		setOpenKeys: (data) => {
			dispatch(actions.setOpenKeys(data))
		},

		setSelectedKeys: (data) => {
			dispatch(actions.setSelectedKeys(data))
		},

		clearTokenMessage: () => {
			dispatch(actions.clearTokenMessage());
		},

		initAllState: () => {
			dispatch({
				type: 'USER_LOGOUT'
			});
		}
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);