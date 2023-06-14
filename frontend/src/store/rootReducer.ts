import { combineReducers } from '@reduxjs/toolkit';
import { ApplicationState } from './types';
import { coreSlice } from './core';

const coreReducers = {
	core: coreSlice.reducer,
};

const rootReducers = combineReducers<ApplicationState>({
	...coreReducers,
});

export default rootReducers;
