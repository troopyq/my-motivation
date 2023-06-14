import createSaga from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import rootSaga from './rootSaga';
import rootReducers from './rootReducer';

const devTools = true;
const sagaMiddleware = createSaga();

const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducers,
  middleware,
  devTools
});

sagaMiddleware.run(rootSaga)

export default store
