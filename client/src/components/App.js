import React, { Suspense } from 'react';
import logo from '../assets/images/logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './views/landingPage/LandingPage';
import LoginPage from './views/loginPage/LoginPage';
import RegisterPage from './views/registerPage/RegisterPage';
import NavBar from './views/navBar/NavBar';
import Footer from './views/footer/Footer';
import UploadProductPage from './views/UploadProductPage/UploadProductPage';

import Auth from '../hoc/auth';

function App() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<NavBar />
			<div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
				<Switch>
					<Route exact path="/" component={Auth(LandingPage, null)} />
					<Route exact path="/login" component={Auth(LoginPage, false)} />
					<Route exact path="/register" component={Auth(RegisterPage, false)} />
					<Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
				</Switch>
			</div>
			<Footer />
		</Suspense>
	);
}

export default App;
