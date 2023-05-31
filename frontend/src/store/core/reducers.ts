import { LoadingState } from '../types';
import { initialState } from './constants';
import { ReducerFunction, User } from './types';
import { AuthParams } from './types';

const auth: ReducerFunction<AuthParams> = (state) => {
	state.formAuth.isLoading = LoadingState.LOADING;
};

const authSuccess: ReducerFunction<User | undefined> = (state, { payload }) => {
	state.formAuth.isLoading = LoadingState.RESOLVE;
	state.user.isLoaded = true;
	state.user.id = payload?.id;
	state.user.role = payload?.role;
	state.user.last_name = payload?.last_name;
	state.user.first_name = payload?.first_name;
};

const authFailed: ReducerFunction<string> = (state, { payload }) => {
	state.user = initialState.user;
	state.formAuth.isLoading = LoadingState.REJECT;
	state.formAuth.error = payload;
};

export const reducers = { auth, authSuccess, authFailed };
