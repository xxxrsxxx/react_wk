import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../../actions/types';

export default function (state = {}, action) {
	console.log('reducer action', action);
	switch (action.type) {
		case LOGIN_USER:
			return { ...state, loginSuccess: action.payload };
			break;
		case REGISTER_USER:
			break;
		case AUTH_USER:
			break;
		default:
			return state;
	}
}
