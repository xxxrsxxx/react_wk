import React, { useEffect, useState } from 'react';
import { Button, Descriptions } from 'antd';
import { postApi } from 'api';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
const ProductInfo = props => {
	console.log('ProductInfo Props', props);
	const user = useSelector(state => state.user.userData);
	const [CartParams, setCartParams] = useState({
		userId: null,
		prdId: null,
	});
	useEffect(() => {
		setCartParams({
			userId: user._id,
			prdId: props.detail._id,
		});
	}, []);
	const addCartHandler = async () => {
		let userConfirm = user.isAuth;

		if (!userConfirm) {
			await alert('로그인 후 이용 가능합니다.');
			props.history.push('/login');
		}

		postApi('cart', { userId: CartParams.userId }).then(res => {
			console.log('resres', res);
			if (res.data.success) addToCart();
		});
	};
	const addToCart = () => {
		postApi('cart/addToCart', CartParams).then(res => console.log('addCart', res));
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
