import { UI_STATE } from '../../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case UI_STATE:
			return { ...state, uiData: action.payload };
			break;
		default:
			return state;
	}
}
