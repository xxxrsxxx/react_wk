import React from 'react';
import logo from './assets/images/logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import ResisterPage from './components/views/ResisterPage/ResisterPage';

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
						<Route exact path="/" component={LandingPage}></Route>
						<Route exact path="/login" component={LoginPage}></Route>
						<Route exact path="/ResisterPage" component={ResisterPage}></Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;

function Home() {
	return (
		<div>
			<h2>Home</h2>
		</div>
	);
}

function About() {
	return (
		<div>
			<h2>About</h2>
		</div>
	);
}

function Dashboard() {
	return (
		<div>
			<h2>Dashboard</h2>
		</div>
	);
}
