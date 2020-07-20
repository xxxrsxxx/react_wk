import React, { useEffect, useState } from 'react';
import { Button, Descriptions } from 'antd';
import { postApi } from 'api';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addToCart } from 'store/actions/userAction/userAction';
const ProductInfo = props => {
	console.log('ProductInfo Props', props);
	const user = useSelector(state => state.user.userData);
	const dispatch = useDispatch();
	useEffect(() => {}, []);
	const addCartHandler = () => {
		let userConfirm = user.isAuth;

		if (!userConfirm) {
			alert('로그인 후 이용 가능합니다.');
			props.history.push('/login');
		}
		dispatch(addToCart(props.detail._id));
		alert('Add To Cart');
	};
	return (
		<div>
			<Descriptions title='Product Info'>
				<Descriptions.Item label='Price'>{props.detail.price}</Descriptions.Item>
				<Descriptions.Item label='Sold'>{props.detail.sold}</Descriptions.Item>
				<Descriptions.Item label='View'>{props.detail.views}</Descriptions.Item>
				<Descriptions.Item label='Description'>
					{props.detail.description}
				</Descriptions.Item>
			</Descriptions>

			<br />
			<br />
			<br />
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Button size='large' shape='round' onClick={addCartHandler}>
					Add to Cart
				</Button>
			</div>
		</div>
	);
};

export default withRouter(ProductInfo);
