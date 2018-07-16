import React, { Component } from 'react';
import { Modal, Button, Form, Icon, Input, message } from 'antd';
import { axiosPost } from 'src/config';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class GroupAdd extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = { 
		visible: PropTypes.bool,
		handleCancel: PropTypes.func,
		groupData: PropTypes.object
	};

	static defaultProps = {
		groupData: {}
	};

	handleSubmit(e) {
		e.preventDefault();

		this.props.form.validateFields(async (err, values) => {
	      	if (!err) { 
	      		let ajaxUrl = '/admin/adminGroupAdd';

	      		if (this.props.groupData._id) {
	      			values._id = this.props.groupData._id; 
	      		}
	  
	        	let res = await axiosPost(ajaxUrl, values); 

	        	if (res.state == 'success') { 
	        		this.props.handleCancel('success');
	        		message.success(res.msg)
	        	} else {
	        		message.error(res.msg);
	        	}
	      	}
	    });
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = { 
		    labelCol: { // label的长
		        xs: { span: 8 },
		        sm: { span: 4 },
		  	},
			wrapperCol: { // 输入框的长
		        xs: { span: 16 },
		        sm: { span: 20 },
			}
	    };

	    const formBtnLayout = {
            wrapperCol: {
                xs: { span: 16, offset: 8 },
                sm: { span: 20, offset: 4 }
            }
        }

        let groupData = this.props.groupData;
 
		return (
			<Modal title="Title"
	          	visible={this.props.visible} 
	          	footer={null}
	          	onCancel={this.props.handleCancel} >

	          	<Form onSubmit={this.handleSubmit.bind(this)}>
	          		<FormItem label='角色名' {...formItemLayout}>
				        {getFieldDecorator('name', {
				            rules: [
					            { required: true, message: '角色名不能为空！' },
					            { pattern: /(\W){2,10}/, message: '2-10个中文字符!' }
				            ],
				            initialValue: groupData.name
				        })(
				            <Input />
				        )}
				    </FormItem>

				    <FormItem label='角色描述' {...formItemLayout}>
				        {getFieldDecorator('comment', {
				            rules: [{ required: true, message: '角色描述不能为空！' }],
				            initialValue: groupData.comment
				        })(
				            <Input />
				        )}
				    </FormItem> 

				    <FormItem {...formBtnLayout}>
                        <Button type="primary" htmlType="submit">保存</Button> 
                    </FormItem>

	          	</Form>
	 
        	</Modal>

		);
	}
}

export default Form.create({})(GroupAdd);