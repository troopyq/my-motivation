import { all, put, takeLatest } from 'redux-saga/effects';
import { GeneratorSagaType, Response } from '../types';
import { coreActions } from './actions';
import { AuthParams, AuthResponse, User } from './types';
import { call } from '../../utils/saga';
import api from '../../utils/api/idnex';
import { AxiosError } from 'axios';

function* getUser({ payload: id }: { payload: number | undefined }) {
	try {
		const res = yield* call(() => api.get<Response<User>>('/user', { params: { id } }));
		if (res && res.status === 200 && res.data.status) {
			yield put(coreActions.authSuccess(res.data.data));
		} else {
			throw new Error(res.data.error || 'Ошибка авторизации');
		}
	} catch (error) {}
}

function* auth({ payload }: { payload: AuthParams }) {
	try {
		const res = yield* call(() => api.post<Response<AuthResponse>>('/auth', payload));

		if (res?.status === 200 && res.data.status) {
			localStorage.setItem('token', res.data.data?.token || '');
			yield put(coreActions.setTokenAuth(res.data.data?.token || ''));
			yield put(coreActions.getUser(res.data.data?.id));
		} else if (res?.status === 401) {
			yield put(coreActions.authFailed('Неправильный логин или пароль'));
		} else {
			throw new Error(res.data.error || 'Ошибка авторизации');
		}
	} catch (error) {
		yield put(
			coreActions.authFailed(
				(error as AxiosError<Response>).response?.data?.error || 'Ошибка авторизации',
			),
		);
	}
}

function* coreSaga(): GeneratorSagaType {
	yield all([takeLatest(coreActions.auth, auth), takeLatest(coreActions.getUser, getUser)]);
}

export default coreSaga;
