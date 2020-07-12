/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from 'api/config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RightMenu = props => {
	const storeState = useSelector(state => state);

	const logoutHandler = () => {
		axios.get(`${USER_SERVER}/logout`).then(response => {
			if (response.status === 200) {
				props.history.push('/login');
			} else {
				alert('Log Out Failed');
			}
		});
	};
	if (storeState.user.userData && !storeState.user.userData.isAuth) {
		return (
			<Menu mode={props.mode}>
				<Menu.Item key='mail'>
					<a href='/login'>Signin</a>
				</Menu.Item>
				<Menu.Item key='app'>
					<a href='/register'>Signup</a>
				</Menu.Item>
			</Menu>
		);
	} else {
		return (
			<Menu mode={props.mode}>
				<Menu.Item key='upload'>
					<a href='/product/upload'>Upload</a>
				</Menu.Item>
				<Menu.Item key='logout'>
					<a onClick={logoutHandler}>Logout</a>
				</Menu.Item>
			</Menu>
		);
	}
};

export default withRouter(RightMenu);
