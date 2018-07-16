// import Immutable from 'immutable';
import { userAction } from  '../action';
import * as actions from  '../action';
 
const defaultUser = {state: 'loading', data: [], filter: {page: 1, num: 20}};
const user = (state = defaultUser, action) => {

	switch(action.type) {
		case userAction.GET_USER_START: 
			return {...state, state: 'loading'};

		case userAction.GET_USER_ERROR: 
			return {...state, state: 'error'};

		case userAction.GET_USER_SUCCESS: 
			return {state: 'success', data: action.data};

		default: 
			return state;
	}
};

export default user;