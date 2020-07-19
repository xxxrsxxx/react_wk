import { ADD_TO_CART, GET_CART_ITEMS, REMOVE_CART_ITEM } from '../types';
import { getApi, postApi } from 'api/index';
export function addToCart(dataToSubmit) {
	const request = null;

	return {
		type: ADD_TO_CART,
		payload: request,
	};
}
