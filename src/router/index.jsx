import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

const Index = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('components/index').default)
    }, 'index');
};

const AminLogin = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('components/admin/login').default)
    }, 'adminLogin');
};

const AdminIndex = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('components/admin/index').default)
    }, 'adminIndex');
};

// const UserList = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('components/admin/userList').default)
//     }, 'adminUserList');
// };

const GroupList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('components/admin/groupList').default)
    }, 'adminGroupList');
};


const UserAdd = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('components/user/UserAdd').default)
    }, 'userAdd');
};

const UserList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('components/user/UserList').default)
    }, 'UserList');
}; 
 

export default (
	<Router history={hashHistory}>
        <Route path="/" getComponent={AminLogin}></Route>
        <Route path="/admin/login" getComponent={AminLogin}></Route>

        <Route path="/admin" getComponent={AdminIndex}> 
            <Route path="userList" getComponent={UserList}></Route>
            <Route path="groupList" getComponent={GroupList}></Route>
            <Route path="userAdd" getComponent={UserAdd}></Route>  
        </Route>
	</Router>
)

