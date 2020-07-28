import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LeftMenu from './sections/LeftMenu';
import RightMenu from './sections/RightMenu';

import { Drawer, Button, Icon } from 'antd';
import './sections/Navbar.css';
import logo from 'assets/images/logo.svg';
const NavBar = () => {
	const [visible, setVisible] = useState(false);
	const member = useSelector(state => state.user.userData);
	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	return (
		<nav
			className='menu'
			style={{ position: 'fixed', width: '100%', overflow: 'initial', zIndex: 5 }}>
			<div className='menu__logo'>
				<Link to='/'>
					<img src={logo} alt='#' />
				</Link>
			</div>
			<div className='menu__container'>
				<div className='menu_left'>
					<LeftMenu mode='horizontal' />
				</div>
				<div className='menu_right'>
					<RightMenu mode='horizontal' />
				</div>
				<Button className='menu__mobile-button' type='primary' onClick={showDrawer}>
					<Icon type='align-right' />
				</Button>
				<Drawer
					title='Basic Drawer'
					placement='right'
					className='menu_drawer'
					closable={false}
					onClose={onClose}
					visible={visible}>
					<LeftMenu mode='inline' />
					<RightMenu mode='inline' />
				</Drawer>
			</div>
			{member && member.name && (
				<div className='user_info'>
					<p style={{ margin: 0 }}>{member.name}님</p>
				</div>
			)}
		</nav>
	);
};

export default NavBar;
