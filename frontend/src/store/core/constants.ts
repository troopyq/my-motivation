import { CoreState } from './types';

export const initialState: CoreState = {
	user: {
		isLoaded: '',
		token: null,
	},
	header: {
		title: 'Моя мотивация',
	},
	formAuth: {
		isLoading: '',
		error: null,
	},
};
