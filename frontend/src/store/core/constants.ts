import { CoreState } from './types';

export const initialState: CoreState = {
	user: {
		isLoaded: false,
		token: localStorage.getItem('token'),
	},
	header: {
		title: 'Моя мотивация',
	},
	formAuth: {
		isLoading: '',
		error: null,
	},
};
