import axios from 'axios';
import { message } from 'antd';
import store from '../redux/store';
import { setTokenMessage } from '../redux/action';

// 添加响应拦截器
axios.interceptors.response.use(function (response) {

    if (response.data.state === 'error' && response.data.msg.indexOf('token') >= 0 ) {
    	console.log(response);
    	store.dispatch(setTokenMessage(response.data))
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

// const baseUrl = 'http://localhost:3000/api';
const baseUrl = '/api';

export const axiosPost =  (url, data = {}) => { 
	let conf = {
		method: 'post',
	  	url: baseUrl + url,
	  	data,
	  	timeout: 10000
	};
	let errObj = {
		status: 'error',
		msg: '请求失败！'
	};
	return axios(conf)
		.then(res => { 
			if (res.status == 200) { 
				return res.data;
			} else { 
				error.msg = res.msg || error.msg;
				return errObj
			}
		})
		.catch(() => {
			return errObj
		});
};


export const axiosGet = (url, params = {}) => {
	let conf = {
		method: 'get',
	  	url: baseUrl + url,
	  	params,
	  	timeout: 10000
	};
	let errObj = {
		status: 'error',
		msg: '请求失败！'
	};
	
	return axios(conf)
		.then(res => {
			if (res.status == 200) {
				return res.data;
			} else {
				error.msg = res.msg || error.msg;
				return errObj;
			}
		})
		.catch(() => {
			return errObj;
		});
};