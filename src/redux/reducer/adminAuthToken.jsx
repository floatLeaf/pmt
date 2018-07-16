import { adminAuthTokenAction } from '../action';

const defaultAdminAuthToken = {
	state: 'success',
	msg: 'success'
};

const adminAuthToken = (state = defaultAdminAuthToken, action) => {

	switch(action.type) {

		case adminAuthTokenAction.SET_TOKEN_MESSAGE:
			return action.data;

		case adminAuthTokenAction.CLEAR_TOKEN_MESSAGE:
			return defaultAdminAuthToken;

		default: 
			return state;
	}
};

export default adminAuthToken;