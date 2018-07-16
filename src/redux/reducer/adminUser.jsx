import { adminUserAction } from '../action';

const defaultUserList = {
    state: 'loading',
    data: [],
    msg: '数据加载中...',
    total: 1
};

export const adminUser = (state = defaultUserList, action) => {

    switch (action.type) {
        case adminUserAction.GET_ADMIN_USER_START:
            return defaultUserList;
        
        case adminUserAction.GET_ADMIN_USER_SUCCESS:
            return {...action.data};
            
        case adminUserAction.GET_ADMIN_USER_ERROR:
            return {...defaultUserList, state: 'error', msg: '数据请求失败'};

        default: 
            return state; 
    } 
};

export default adminUser;