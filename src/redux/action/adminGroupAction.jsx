import { axiosGet } from 'src/config';
import { message } from 'antd';

const GET_ADMIN_GROUP = 'GET_ADMIN_GROUP';
const GET_ADMIN_GROUP_START = 'GET_ADMIN_GROUP_START';
const GET_ADMIN_GROUP_SUCCESS = 'GET_ADMIN_GROUP_SUCCESS';
const GET_ADMIN_GROUP_ERROR = 'GET_ADMIN_GROUP_ERROR';

export const adminGroupAction = {
	GET_ADMIN_GROUP_START,
	GET_ADMIN_GROUP_SUCCESS,
	GET_ADMIN_GROUP_ERROR
};


export const getAdminGroupStart = () => ({
	type: GET_ADMIN_GROUP_START
});

export const getAdminGroupSuccess = (data) => ({
	type: GET_ADMIN_GROUP_SUCCESS,
	data
});

export const getAdminGroupError = () => ({
	type: GET_ADMIN_GROUP_ERROR
});


export const getAdminGroup = (data = {page: 1, size: 20}) => {
	return async (dispatch) => {

		dispatch(getAdminGroupStart());

		let json = await axiosGet('/admin/adminGroupList', data);

		if (json.state === 'success' && json.data) {
			dispatch(getAdminGroupSuccess(json));
		} else {
			dispatch(getAdminGroupError());
			message.error(json.msg || '请求失败');
		}
	};
};
 