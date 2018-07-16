import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import router from './router';
import store from './redux/store';

import 'assets/style/base.css';
import 'assets/style/antd-reset.scss';
import 'assets/style/style.scss';

 
render(
	<Provider store={store}>
   		{router}
	</Provider>,
	document.getElementById('app')
);