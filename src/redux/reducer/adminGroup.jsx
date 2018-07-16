import { adminGroupAction } from '../action';

const defaultGroupList = {
	state: 'loading',
	data: [],
	msg: '数据加载中...'
};


const adminGroup = (state = defaultGroupList, action) => {
	switch (action.type) {

		case adminGroupAction.GET_ADMIN_GROUP_START: 
			return defaultGroupList;

		case adminGroupAction.GET_ADMIN_GROUP_SUCCESS: 
			return {...action.data};

		case adminGroupAction.GET_ADMIN_GROUP_ERROR:
			return {...defaultGroupList, state: 'error', msg: '数据请求失败'};

		default:
			return state;
	} 
};

export default adminGroup;