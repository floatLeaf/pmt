import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import * as reducer from '../reducer';
 
let store;
const adminReducers = combineReducers(reducer);
 
const rootReducers = (state, action) => {
	if (action.type === 'USER_LOGOUT') {
		state = undefined; // 或者 ｛｝
	} 

	return adminReducers(state, action);
};

// 判断浏览器是否安装了redux-tools插件
if ((window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())) {
	store = createStore(
		rootReducers,
		compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
	);
} else {
	store = createStore(
		rootReducers,
		applyMiddleware(thunk)
	);
}


export default store;