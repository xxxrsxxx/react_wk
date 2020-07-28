import {
	LOGIN_USER,
	REGISTER_USER,
	AUTH_USER,
	LOGOUT_USER,
	ADD_TO_CART,
	GET_CART_ITEMS,
	REMOVE_CART_ITEM,
} from '../../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case LOGIN_USER:
			return { ...state, loginSuccess: action.payload };
			break;
		case REGISTER_USER:
			return { ...state, register: action.payload };
			break;
		case AUTH_USER:
			return { ...state, userData: action.payload };
			break;
		case LOGOUT_USER:
			return { ...state, logoutSuccess: action.payload };
		case ADD_TO_CART:
			return {
				...state,
				userData: {
					...state.userData,
					cart: action.payload,
				},
			};
			break;
		case GET_CART_ITEMS:
			return { ...state, cartDetail: action.payload };
		case REMOVE_CART_ITEM:
			return {
				...state,
				cartDetail: { product: action.payload.productInfo },
				userData: {
					...state.userData,
					cart: action.payload.cart,
				},
			};
		default:
			return state;
	}
}
