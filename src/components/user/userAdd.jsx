import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Form, Icon, Input, Button, Radio, Row, Col, message } from 'antd';
import { connect } from 'react-redux';
import { axiosGet, axiosPost } from '../../config';
import * as actions from 'myRedux/action';
import md5 from 'js-md5';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class UserAdd extends Component {
 	constructor(props) {
 		super(props);
 		this.validUserName = this.validUserName.bind(this);
 		this.handleSubmit = this.handleSubmit.bind(this);
 	}

 	// ajax 校验登录帐号
 	async validUserName(rule, value, callback) {
 		let form = this.props.form,
 			result = await axiosGet('', {username: value});

 		if (result.state == 'error') {
 			callback(result.msg);
 			return;
 		}

 		callback();
 	}

 	async handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => { 
        	console.log('error=>', err)
        
            if (!err) {
                if (values.password) {
                    values.password = md5(values.password);
                    // values.confirmPass = md5(values.confirmPass);
                } 

                values.power = ['manage']; // 协管员
                
         		let json = await axiosPost('/userAdd', values);
         		message[json.state](json.msg);
         		if (json.state == 'success') {
         			this.props.getUserList();
         			this.props.router.push('/admin/userAdd');
         		}
            }
        });
    }


 	render() {
 		const { getFieldDecorator } = this.props.form;

 		const formItemLayout = {
	      	labelCol: { 
	        	sm: { span: 6 },
	        	md: { span: 8 },
	        	xl: { span: 6 }
	      	},
	      	wrapperCol: { 
	        	sm: { span: 8 },
	        	md: { span: 14 },
	        	xl: { span: 12 }
	     	},
	    };
	    const submitBtnLayout = {
		    wrapperCol: { 
		        sm: { span: 8},
		        md: { span: 6},
		        xl: { span: 18 }
		   	}
	    };

 		return (
 			<div>
	 			<Form onSubmit={this.handleSubmit} className="login-form">
		 			<Row>	 
		 				<Divider orientation="left">基本信息</Divider>
		 				<Col span={10}>
						 	<FormItem 
						 		{...formItemLayout}
						 		label="状态" >

						 		{getFieldDecorator('is_out', {
						            rules: [{
						              required: true, message: '必填项',
						            }],
						          })(
						            <RadioGroup >
								        <Radio value={1}>在职</Radio>
								        <Radio value={0}>离职</Radio> 
								 	</RadioGroup>
						          )}
						 	</FormItem>
						</Col>

					 	<Col span={10}>
						 	<FormItem
						 		{...formItemLayout}
						 		label="姓名">

						 		{ getFieldDecorator('name', {
						 			rules: [{
						 				required: true, message: '姓名不能为空'
						 			}]
							 	})(
							 		<Input />
							 	)}
						 	</FormItem>
					 	</Col>

					 	<Col span={10}>
						 	<FormItem
						 		{...formItemLayout}
						 		label="公司">

						 		{getFieldDecorator('company')(
						 			<Input />
						 		)}
						 	</FormItem>
					 	</Col>

					 	<Col span={10}>
						 	<FormItem
						 		{...formItemLayout}
						 		label="部门">

						 		{ getFieldDecorator('department', {
						 			rules: [{
						 				required: true, message: '部门不能为空'
						 			}]
							 	})(
							 		<Input />
							 	)}
						 	</FormItem>
					 	</Col>
					 	
					 	<Col span={10}>
						 	<FormItem
						 		{...formItemLayout}
						 		label="手机号">

						 		{ getFieldDecorator('phone', {
						 			rules: [{
						 				required: true, message: '手机号不能为空',
						 				pattern: /^(13|15|14|17|18)\d{9}/, message: '手机号码格式错误'
						 			}]
							 	})(
							 		<Input />
							 	)}
						 	</FormItem>
					 	</Col>

					 	<Col span={10}>
						 	<FormItem
						 		{...formItemLayout}
						 		label="微信号">

						 		{ getFieldDecorator('wechat', {
						 			rules: [{
						 				required: true, message: '微信号不能为空'
						 			}]
							 	})(
							 		<Input />
							 	)}
						 	</FormItem>
					 	</Col>
					</Row> 

					<Row>
						<Divider orientation="left">帐号设置</Divider>

		 				<Col span={10}>
			 				<FormItem
			 					{...formItemLayout}
			 					label="登录帐号">
		 						{
		 							getFieldDecorator('username', {
		 								rules: [
		 									{ required: true, message: '登录帐号必填！'}, 
		 									{ validatoe: this.validUserName }
		 								]
		 							})(<Input />)
		 						}
		 					</FormItem>
		 				</Col>
	 					
	 					<Col span={10}>
		 					<FormItem
		 						{...formItemLayout}
		 						label="密码">
		 						{
		 							getFieldDecorator('password', {
		 								rules: [
		 									{ required: true, message: '密码不能为空！'}
		 								]
		 							})(<Input type="password" />)
		 						} 
		 					</FormItem>
	 					</Col>
					</Row>
				 	
	 				<Row style={{marginBottom: '20px'}}>	
		 				<Divider orientation="left">项目信息</Divider>
		 				<Col span={10}>
			 				<FormItem
			 					{...formItemLayout}
			 					label="项目信息">

			 					<Button type="primary">选择</Button>
			 				</FormItem> 
		 				</Col>

		 			 	{/*
		 				<Row>
		 					<Col className="selected-project" sm={{span: 10, offset: 6}} md={{ span: 10, offset: 3 }}>
		 						<Col span={6} className="name">name</Col>
		 						<Col span={18} className="val"> 
					 					{ getFieldDecorator('project[0]')(<Input type="hidden" />) } 
				 						{
			 								getFieldDecorator('desc[]', {
				 								rules: [
				 									{ required: true, message: '描述不能为空！'}
				 								]
				 							})(<Input />)
				 						}  

		 						</Col>
		 					</Col>
		 				</Row>
						*/}
		 			</Row>

		 			<FormItem {...submitBtnLayout} style={{textAlign: 'center'}}>
			          	<Button type="primary" htmlType="submit">保存</Button>
			        </FormItem>
	 			</Form> 
 			</div>
 		) 
 	}
}


function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		getUserList: () => {
			dispatch(actions.getUser());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({})(UserAdd));