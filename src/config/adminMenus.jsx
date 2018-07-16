
import React, { Component } from 'react';
import { Icon } from 'antd';

export  const adminMenus = [
	{
		title: <span><Icon type="setting" />系统管理</span>,
		items: [
			{
				link: '/admin/userList',
				text: '协管员管理'
			},
			{
				link: '/admin/groupList',
				text: '角色管理'
			},
			{
				link: '/admin/userAdd',
				text: '协管员新增'
			}
		]
	},

	{
		title: <span><Icon type="file-text" />文档管理</span>,
		items: [
			{
				link: '/admin/documentList',
				text: '文档管理'
			}
		]
	}
];

let powers = {
	admin: '管理员',
	manage: '协管员'
};

export const userListColumn = (cmponent) => [
	{	
		title: '姓名',
		dataIndex: 'name'
	}, 
	{
		title: '公司名称',
		dataIndex: 'company', 
	}, 
	{
		title: '所属部门',
		dataIndex: 'department', 
	}, 
	{
		title: '状态',
		dataIndex: 'is_out', 
		filters: [
			{text: '在职', value: 1},
			{text: '离职', value: 0},
		],
		filteredValue: cmponent.state.val,
		onFilter: function(value, record) {
			// cmponent.filterIsOut(arguments)
			console.log('arguments=>', arguments)
		},
		render: (text, record) => {
			return text == 1 ? '在职' : '离职';
		}
	}, 
	{
		title: '手机号码',
		dataIndex: 'phone', 
	}, 
	{
		title: '用户名',
		dataIndex: 'username', 
	}, 
	{
		title: '操作',
		render: function(text, record, key) { 
			return (
				<div className="td-opt">
					<a onClick={() => cmponent.handleDataEdit(key)}><Icon type="edit" /></a> 
				</div>
			)
		}
	},
	{
		title: '权限',
		dataIndex: 'power',  
		render: (text, record, index) => { 
			return (
				text.map((power, n) => { 
					return (<span key={power}>{n == 0 ? '' : '、'}{powers[power]}</span>)
				})
			)
		}
	}
];