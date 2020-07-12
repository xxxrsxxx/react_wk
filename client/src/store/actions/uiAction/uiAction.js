import { UI_STATE } from 'store/actions/types';

export function uiState(config) {
	const initialValues = {
		envState: 'prod',
		...config,
	};
	return {
		type: UI_STATE,
		payload: initialValues,
	};
}
