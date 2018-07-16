const SET_TITLE = 'SET_TITLE';
const RESET_TITLE = 'RESET_TITLE';
const STT_OPEN_KEYS = 'STT_OPEN_KEYS';
const SET_SELECTED_KEYS = 'SET_SELECTED_KEYS';

export const adminIndexAction = {
	SET_TITLE,
	RESET_TITLE,
	STT_OPEN_KEYS,
	SET_SELECTED_KEYS
};

export const setTitle = (data) => {
	return {
		type: SET_TITLE,
		data
	}
};

export const resetTitle = () => {
	return {
		type: RESET_TITLE 
	}
};


export const setOpenKeys = (data) => {
	return {
		type: STT_OPEN_KEYS,
		data
	}
};

export const setSelectedKeys = (data) => {
	return {
		type: SET_SELECTED_KEYS,
		data
	}
}