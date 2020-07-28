import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem } from 'store/actions/userAction/userAction';
import ListItem from './sections/ListItem';
import { Empty, Result } from 'antd';
const CartPage = props => {
	const dispatch = useDispatch();
	const user = props.user.userData;
	const [Total, setTotal] = useState(0);
	const [ShowTotal, setShowTotal] = useState(false);
	const [ShowSuccess, setShowSuccess] = useState(false);
	console.log('CartPage', props);
	useEffect(() => {
		let cartItems = [];
		//userData check cart value
		if (user && user.cart) {
			if (user.cart.length > 0) {
				user.cart.forEach(item => {
					cartItems.push(item.id);
				});
				dispatch(getCartItems(cartItems, user.cart)).then(res => {
					calculateTotal(res.payload.product);
				});
			}
		}
	}, [props.user.userData]);

	let calculateTotal = cartDetail => {
		let total = 0;

		cartDetail.map(item => {
			total += parseInt(item.price, 10) * item.quantity;
		});

		setTotal(total);
		setShowTotal(true);
	};

	let removeFromCart = productId => {
		dispatch(removeCartItem(productId)).then(res => {
			if (res.payload.productInfo.length <= 0) {
				setShowTotal(false);
			}
		});
	};

	return (
		<div style={{ width: '85%', margin: '3rem auto' }}>
			<h1>Cart Page</h1>

			<div>
				<ListItem products={props.user.cartDetail} removeItem={removeFromCart} />
			</div>

			{ShowTotal ? (
				<div style={{ marginTop: '3rem' }}>
					<h2>Total Amount: ${Total}</h2>
				</div>
			) : ShowSuccess ? (
				<Result status='success' title='Successfully Purchased Items' />
			) : (
				<>
					<br />
					<Empty description={false} />
				</>
			)}
		</div>
	);
};

export default CartPage;
