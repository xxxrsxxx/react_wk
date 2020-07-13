import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { uiState } from 'store/actions/uiAction/uiAction';

import LandingPage from './views/landingPage/LandingPage';
import LoginPage from './views/loginPage/LoginPage';
import RegisterPage from './views/registerPage/RegisterPage';
import NavBar from './views/navBar/NavBar';
import Footer from './views/footer/Footer';

import UploadProductPage from 'components/views/uploadProductPage/UploadProductPage';

import Auth from '../hoc/auth';
function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		const uiConfig = {
			envState: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
		};
		dispatch(uiState(uiConfig));
	}, []);
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<NavBar />
			<div style={{ paddingTop: '49px', minHeight: 'calc(100vh - 80px)' }}>
				<Switch>
					<Route exact path='/' component={Auth(LandingPage, null)} />
					<Route exact path='/login' component={Auth(LoginPage, false)} />
					<Route exact path='/register' component={Auth(RegisterPage, false)} />
					<Route exact path='/product/upload' component={Auth(UploadProductPage, true)} />
				</Switch>
			</div>
			<Footer />
		</Suspense>
	);
}

export default App;
