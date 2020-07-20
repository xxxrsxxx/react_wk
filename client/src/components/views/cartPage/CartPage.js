import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems } from 'store/actions/userAction/userAction';
const CartPage = props => {
	const dispatch = useDispatch();
	const user = props.user.userData;
	useEffect(() => {
		let cartItems = [];
		//userData check cart value
		if (user && user.cart) {
			if (user.cart.length > 0) {
				user.cart.forEach(item => {
					cartItems.push(item.id);
				});
				dispatch(getCartItems(cartItems, user.cart)).then(res => {
					console.log('cartPage', res);
					//calculateTotal(response.payload);
				});
			}
		}
	}, [props.user.userData]);

	return <div></div>;
};

export default CartPage;
