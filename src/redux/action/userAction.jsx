import { axiosGet } from 'src/config';
import { message } from 'antd';
const GET_USER_START = 'GET_USER_START';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_ERROR = 'GET_USER_ERROR';

export const userAction = {
	GET_USER_START,
	GET_USER_SUCCESS,
	GET_USER_ERROR
};

export const getUserStart = () => {
	return {
		type: GET_USER_START
	}
};

export const getUserSuccess = (data, filter) => {
	return {
		type: GET_USER_SUCCESS,
		data,
		filter
	}
};

export const getUserError = () => {
	return {
		type: GET_USER_ERROR
	}
};

export const getUser = (filter = {}) => {
	return async dispatch => {
		dispatch(getUserStart());

		let res = await axiosGet('/userList', {filter});
		if (res.state == 'error') {
			dispatch(getUserError());
			message.error(res.msg);
			return;
		} 

		dispatch(getUserSuccess(res.data, filter))
	}
};