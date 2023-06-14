import { all, fork } from 'redux-saga/effects';
import { GeneratorSagaType } from './types';
import coreSaga from './core/sagas';

function* rootSaga(): GeneratorSagaType {
	yield all([fork(coreSaga)]);
}

export default rootSaga;
