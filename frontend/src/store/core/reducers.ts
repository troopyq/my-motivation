import { LoadingState } from '../types';
import { initialState } from './constants';
import { ReducerFunction, User } from './types';
import { AuthParams } from './types';

const auth: ReducerFunction<AuthParams> = (state) => {
	state.formAuth.isLoading = LoadingState.LOADING;
};

const setTokenAuth: ReducerFunction<string> = (state, { payload: token }) => {
	state.user.token = token;
	state.user.isLoaded = LoadingState.LOADING;
};

const clearToken: ReducerFunction = (state) => {
	state.user.token = null;
	state.user.isLoaded = LoadingState.REJECT;
};

const authSuccess: ReducerFunction<User | undefined> = (state, { payload }) => {
	state.formAuth.isLoading = LoadingState.RESOLVE;
	state.user.isLoaded = LoadingState.RESOLVE;

	Object.keys(payload || {}).forEach((el) => {
		state.user[el] = payload?.[el];
	});
};

const authFailed: ReducerFunction<string> = (state, { payload }) => {
	state.user = initialState.user;
	state.formAuth.isLoading = LoadingState.REJECT;
	state.formAuth.error = payload;
};

const getUser: ReducerFunction<number | undefined> = (state) => state;

export const reducers = { auth, authSuccess, authFailed, setTokenAuth, clearToken, getUser };
