/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from 'store/actions/userAction/userAction';
const RightMenu = props => {
	const dispatch = useDispatch();
	const storeState = useSelector(state => state);
	const admin = storeState.user.userData ? storeState.user.userData.isAdmin : false;
	const logoutHandler = () => {
		dispatch(logoutUser()).then(res => {
			if (res.payload.success) {
				window.localStorage.removeItem('userId');
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
					<a href='/login'>SignIn</a>
				</Menu.Item>
				<Menu.Item key='app'>
					<a href='/register'>SignUp</a>
				</Menu.Item>
			</Menu>
		);
	} else {
		return (
			<Menu mode={props.mode}>
				{admin == true && (
					<Menu.Item key='upload'>
						<a href='/product/upload'>Upload</a>
					</Menu.Item>
				)}
				{props.mode == 'horizontal' ? (
					<Menu.Item key='cart' style={{ paddingBottom: 3 }}>
						<Badge
							count={
								storeState.user.userData && storeState.user.userData.cart.length
							}>
							<a
								href='/user/cart'
								className='head-example'
								style={{ marginRight: -10, color: '#667777' }}>
								<Icon
									type='shopping-cart'
									style={{ fontSize: 30, marginBottom: 3 }}
								/>
							</a>
						</Badge>
					</Menu.Item>
				) : (
					<Menu.Item key='cart' style={{ paddingBottom: 3 }}>
						<a href='/user/cart'>
							Cart
							{storeState.user.userData.cart && (
								<span style={{ paddingLeft: '10px', color: '#1890ff' }}>
									({storeState.user.userData.cart.length})
								</span>
							)}
						</a>
					</Menu.Item>
				)}
				<Menu.Item key='logout'>
					<a onClick={logoutHandler}>Logout</a>
				</Menu.Item>
			</Menu>
		);
	}
};

export default withRouter(RightMenu);
