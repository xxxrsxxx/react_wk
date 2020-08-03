import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const LeftMenu = props => {
	return (
		<Menu mode={props.mode}>
			<Menu.Item key='mail'>
				<Link to='/'>Home</Link>
			</Menu.Item>
			<SubMenu title={<span>Other</span>}>
				<MenuItemGroup title='Board'>
					<Menu.Item key='write'>
						<Link to='/bbs/write'>write</Link>
					</Menu.Item>
					<Menu.Item key='view'>view</Menu.Item>
				</MenuItemGroup>
				{/*<MenuItemGroup title='Item 2'>*/}
				{/*	<Menu.Item key='setting:3'>Option 3</Menu.Item>*/}
				{/*	<Menu.Item key='setting:4'>Option 4</Menu.Item>*/}
				{/*</MenuItemGroup>*/}
			</SubMenu>
		</Menu>
	);
};

export default LeftMenu;
