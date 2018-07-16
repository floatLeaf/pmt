const SET_TOKEN_MESSAGE = 'SET_TOKEN_MESSAGE';
const CLEAR_TOKEN_MESSAGE = 'CLEAR_TOKEN_MESSAGE';

export const adminAuthTokenAction = {
	SET_TOKEN_MESSAGE,
	CLEAR_TOKEN_MESSAGE
};

export const setTokenMessage = (data) => {
	return {
		type: SET_TOKEN_MESSAGE,
		data
	}
}

export const clearTokenMessage = () => {
	return {
		type: CLEAR_TOKEN_MESSAGE
	}
}