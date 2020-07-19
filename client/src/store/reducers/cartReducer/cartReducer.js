import { ADD_TO_CART, GET_CART_ITEMS, REMOVE_CART_ITEM } from '../../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case ADD_TO_CART:
			return { ...state };
			break;
		default:
			return state;
	}
}
