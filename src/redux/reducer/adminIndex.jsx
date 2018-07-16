import { adminIndexAction } from '../action';

const defaultIndexData = {
	title: '系统管理', 
	subTitle: '系统主页',
	openKeys: [],
 	selectedKeys: []
};

const adminIndex = (state = defaultIndexData, action) => {
 
	switch (action.type) {
		case adminIndexAction.SET_TITLE:
			return {...state, ...action.data};

		case adminIndexAction.RESET_TITLE:
			return {...state, title: '系统管理', subTitle: '系统主页'};

		case adminIndexAction.STT_OPEN_KEYS:
			return {...state, openKeys: action.data}

		case adminIndexAction.SET_SELECTED_KEYS:
			return {...state, selectedKeys: action.data}

		default: 
			return state;
	}
}

export default adminIndex;