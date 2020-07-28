import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, removeCartItem } from 'store/actions/userAction/userAction';
import ListItem from './sections/ListItem';

const CartPage = props => {
	const dispatch = useDispatch();
	const _state = useSelector(state => state.user);

	const [Total, setTotal] = useState(0);
	const [ShowTotal, setShowTotal] = useState(false);

	useEffect(() => {
		let cartItems = [];
		if (_state.userData && _state.userData.cart) {
			if (_state.userData.cart.length > 0) {
				_state.userData.cart.forEach(item => {
					cartItems.push(item.id);
				});
				dispatch(getCartItems(cartItems, _state.userData.cart)).then(res => {
					calculateTotal(res.payload.product);
				});
			}
		}
	}, [_state.userData]);

	const calculateTotal = cartDetail => {
		let total = 0;

		cartDetail.map(item => {
			total += parseInt(item.price, 10) * item.quantity;
		});

		setTotal(total);
		setShowTotal(true);
	};

	const removeFromCart = productId => {
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
				<ListItem products={_state.cartDetail} removeItem={removeFromCart} />
			</div>
			{ShowTotal && (
				<div style={{ marginTop: '3rem' }}>
					<h2>Total Amount: ${Total}</h2>
				</div>
			)}
		</div>
	);
};

export default CartPage;
