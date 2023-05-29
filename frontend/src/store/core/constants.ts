import { CoreState } from './types';

export const initialState: CoreState = {
	user: {
		isLoaded: false,
	},
	header: {
		title: 'Моя мотивация',
	},
	formAuth: {
		isLoading: '',
		error: null,
	},
};
