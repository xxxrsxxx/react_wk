import axios from 'axios';
import {
	LOGIN_USER,
	REGISTER_USER,
	AUTH_USER,
	LOGOUT_USER,
	ADD_TO_CART,
	GET_CART_ITEMS,
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
	console.log('cartItems', cartItems);
	const request = getApi(`${PRODUCT_SERVER}/products_by_id?id=${cartItems}&type=array`).then(
		res => {
			// userData cart items 를 전달 한 후
			// backend product collection Merge

			userCart.forEach(cartItem => {
				res.data.forEach((prdDetail, idx) => {
					if (cartItem.id === prdDetail._id) {
						res.data[idx].quantity = cartItem.quantity;
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
