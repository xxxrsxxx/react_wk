import axios from 'axios';
import {
	LOGIN_USER,
	REGISTER_USER,
	AUTH_USER,
	LOGOUT_USER,
	ADD_TO_CART,
	GET_CART_ITEMS,
	REMOVE_CART_ITEM,
} from '../types';
import { USER_SERVER, PRODUCT_SERVER } from 'api/config';
import { getApi, postApi } from 'api/index';

export function registerUser(dataToSubmit) {
	const request = postApi(`${USER_SERVER}/register`, dataToSubmit).then(res => res.data);
	return {
		type: REGISTER_USER,
		payload: request,
	};
}

export function loginUser(dataToSubmit) {
	const request = postApi(`${USER_SERVER}/login`, dataToSubmit).then(res => res.data);
	return {
		type: LOGIN_USER,
		payload: request,
	};
}

export function auth() {
	const request = getApi(`${USER_SERVER}/auth`).then(res => res.data);
	return {
		type: AUTH_USER,
		payload: request,
	};
}

export function logoutUser() {
	const request = getApi(`${USER_SERVER}/logout`).then(res => res.data);
	return {
		type: LOGOUT_USER,
		payload: request,
	};
}
export async function addToCart(_id) {
	let config = {
		productId: _id,
	};
	const request = await postApi('cart/addToCart', config).then(res => {
		return res.data;
	});

	return {
		type: ADD_TO_CART,
		payload: request,
	};
}
export function getCartItems(cartItems, userCart) {
	const request = getApi(`${PRODUCT_SERVER}/products_by_id?id=${cartItems}&type=array`).then(
		res => {
			// userData cart items 를 전달 한 후
			// backend product collection Merge
			let initData = res.data.product;
			userCart.forEach(cartItem => {
				initData.forEach((prdDetail, idx) => {
					if (cartItem.id === prdDetail._id) {
						initData[idx].quantity = cartItem.quantity;
					}
				});
			});
			return res.data;
		},
	);

	return {
		type: GET_CART_ITEMS,
		payload: request,
	};
}
export function removeCartItem(productId) {
	const request = getApi(`cart/removeFromCart?id=${productId}`).then(res => {
		res.data.cart.forEach(item => {
			res.data.productInfo.forEach((product, index) => {
				if (item.id === product._id) {
					res.data.productInfo[index].quantity = item.quantity;
				}
			});
		});
		return res.data;
	});
	return {
		type: REMOVE_CART_ITEM,
		payload: request,
	};
}
