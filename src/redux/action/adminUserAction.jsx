import { axiosGet } from 'src/config';
import { message } from 'antd';
const GET_ADMIN_USER = 'GET_ADMIN_USER';
const GET_ADMIN_USER_START = 'GET_ADMIN_USER_START';
const GET_ADMIN_USER_SUCCESS = 'GET_ADMIN_USER_SUCCESS';
const GET_ADMIN_USER_ERROR = 'GET_ADMIN_USER_ERROR';

export const adminUserAction = {
    GET_ADMIN_USER_START,
    GET_ADMIN_USER_SUCCESS,
    GET_ADMIN_USER_ERROR 
};

export const getAdminUserStart = () => ({
    type: GET_ADMIN_USER_START
})

export const getAdminUserSuccess = (data) => ({
    type: GET_ADMIN_USER_SUCCESS,
    data
})

export const getAdminUserError = () => ({
    type: GET_ADMIN_USER_ERROR
})

export const getAdminUser = (data = {page: 1, size: 20}) => {
    return async (dispatch) => {
        dispatch(getAdminUserStart());

        let json = await axiosGet('/admin/adminUserList', data);
        if (json.state == 'success' && json.data) {
            dispatch(getAdminUserSuccess(json));
        } else {
            dispatch(getAdminUserError());
            message.error(json.msg || '请求失败');
        }
    }
}