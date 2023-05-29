import { all, put, takeLatest } from 'redux-saga/effects';
import { GeneratorSagaType, Response } from '../types';
import { coreActions } from './actions';
import { AuthParams, AuthResponse, User } from './types';
import { call } from '../../utils/saga';
import api from '../../utils/api/idnex';

function* getUser(id?: number) {
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
		if (res && res.status === 200 && res.data.status) {
			localStorage.setItem('token', res.data.data?.token || '');
			yield getUser(res.data.data?.id);
		} else {
			throw new Error(res.data.error || 'Ошибка авторизации');
		}
	} catch (error) {
		yield put(coreActions.authFailed((error as Error).message));
	}
}

function* coreSaga(): GeneratorSagaType {
	yield all([takeLatest(coreActions.auth, auth)]);
}

export default coreSaga;
