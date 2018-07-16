import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import md5 from 'js-md5';
import { Modal, Button, Form, Input, Icon, Select, Switch, message } from 'antd';
import { axiosPost } from 'src/config';
import axios  from 'axios';

const FormItem = Form.Item;

class UserAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static defaultProps = {
        userData: {}
    };

    static propTypes = {
        visible: PropTypes.bool,
        toggleModal: PropTypes.func,
        group: PropTypes.array,
        userData: PropTypes.object
    };
    

    // 密码校验规则
    comparePassword = (rule, value, callback) => {
        const form = this.props.form;

        if (value && !!form.getFieldValue('confirmPass')) {
            form.validateFieldsAndScroll(['confirmPass'], { force: true });
        }
        callback();
    }

    // 确认密码校验规则
    compareConfirmPass = (rule, value, callback) => {
        const form = this.props.form;
        let pass = form.getFieldValue('password');

        if ((value || pass) && value != pass) {
            callback('两次输入的密码不一致！');
        } else {
            callback();
        }
    }
 
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => { 
            if (!err) {
                
                if (values.password) {
                    values.password = md5(values.password);
                    values.confirmPass = md5(values.confirmPass);
                }
                
                if (this.props.userData._id) {
                    values._id = this.props.userData._id;
                }

                let json = await axiosPost('/admin/adminUserAdd', values);   
                
                
                if (json.state == 'success') { 
                    this.props.toggleModal(false);
                    this.props.form.resetFields();
                    message.success(json.msg);

                } else {
                    message.error(json.msg);
                }
            }
        });
    }
 
    render() { 
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        };
        const formBtnLayout = {
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 }
            }
        };

        return (
            <div>
                <Modal title="填写用户信息"
                    visible={this.props.visible}
                    footer={null}
                    maskClosable={false}
                    width={600}
                    confirmLoading={false}
                    onCancel={() => {this.props.toggleModal(false)}}
                >
                    <Form onSubmit={this.handleSubmit.bind(this)}> 
                        <FormItem {...formItemLayout} label="用户名">
                            {getFieldDecorator('userName', {
                                rules: [{
                                    required: true, message: '用户名不能为空!',
                                }],
                            })(<Input />)}
                        </FormItem>
                            
                        <FormItem {...formItemLayout} label="姓名">
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: '姓名不能为空!',
                                }],
                            })(<Input />)}
                        </FormItem>

                        <FormItem {...formItemLayout} label="密码">
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: !this.props.userData._id, message: '密码不能为空!',
                                },{
                                    min: 6, message: '密码至少6位!',
                                }, {
                                    validator: this.comparePassword
                                }],
                            })(<Input type="password" />)}
                        </FormItem>

                        <FormItem {...formItemLayout} label="确认密码">
                            {getFieldDecorator('confirmPass', {
                                rules: [{
                                    required: !this.props.userData._id, message: '确认密码不能为空!',
                                }, {
                                    min: 6, message: '密码至少6位!',
                                }, {
                                    validator: this.compareConfirmPass
                                }],
                            })(<Input type="password" />)}
                        </FormItem> 

                        <FormItem {...formItemLayout} label="用户组">
                            {getFieldDecorator('group', {
                                rules: [{
                                    required: true, message: '用户组不能为空!', 
                                }],
                            })(
                                <Select placeholder="请选择用户组">
                                    {
                                        this.props.group.map(group => (
                                            <Select.Option key={group._id} value={group._id}>{group.name}</Select.Option>
                                        ))
                                    }
                                    
                                </Select>
                            )}
                        </FormItem>
 
                        <FormItem {...formItemLayout} label="电话">
                            {getFieldDecorator('phoneNum', {
                                rules: [{
                                    required: true, message: '电话不能为空!',
                                    pattern: /^(13|15|14|17|18)\d{9}/, message: '手机号码格式错误' 
                                }],
                            })(<Input type="number" />)}
                        </FormItem> 

                        <FormItem {...formItemLayout} label="邮箱">
                            {getFieldDecorator('email', {
                                rules: [{
                                    required: true, message: '邮箱不能为空!',
                                    type: 'email', message: '邮箱格式错误' 
                                }],
                            })(<Input />)}
                        </FormItem> 

                        <FormItem {...formItemLayout} label="有效">
                            {getFieldDecorator('enable', {
                                rules: [],
                            })(<Switch />)}
                        </FormItem> 

                        <FormItem {...formItemLayout} label="备注">
                            {getFieldDecorator('comments', {
                                rules: [],
                            })(<Input.TextArea rows={4} />)}
                        </FormItem> 
                        
                        <FormItem {...formBtnLayout} style={{textAlign: 'center'}}>
                            <Button htmlType="button" onClick={e => {this.props.toggleModal(false)}}>取消</Button>
                            <Button type="primary" htmlType="submit">注册</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create({
    mapPropsToFields(props) {
        let userData = props.userData || {};

        return {
            userName: Form.createFormField({
                value: userData.userName,
            }),

            group: Form.createFormField({
                value: userData.group,
            }),

            name: Form.createFormField({
                value: userData.name,
            }),

            phoneNum: Form.createFormField({
                value: userData.phoneNum,
            }),

            email: Form.createFormField({
                value: userData.email,
            }),

            enable: Form.createFormField({
                value: userData.enable,
            }), 
        };
    },
})(UserAdd);