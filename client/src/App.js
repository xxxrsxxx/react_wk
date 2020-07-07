import React from 'react';
import logo from './assets/images/logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import ResisterPage from './components/views/ResisterPage/ResisterPage';
import Auth from './hoc/auth';

function App() {
	return (
		<div className="App">
			<Router>
				<div>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/login">login</Link>
						</li>
						<li>
							<Link to="/ResisterPage">ResisterPage</Link>
						</li>
					</ul>
					<hr />
					<Switch>
						<Route exact path="/" component={Auth(LandingPage,null)}></Route>
						<Route exact path="/login" component={Auth(LoginPage,false)}></Route>
						<Route exact path="/ResisterPage" component={Auth(ResisterPage,true)}></Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;

