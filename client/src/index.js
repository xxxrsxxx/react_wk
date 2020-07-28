import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'core-js';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import Reducer from './store/reducers/';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import { $_storage } from './common/util';

import 'antd/dist/antd.css';
import './index.css';

window.$_storage = $_storage();

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
ReactDOM.render(
	<Provider
		store={createStoreWithMiddleware(
			Reducer,
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		)}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
