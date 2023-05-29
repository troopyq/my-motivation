import { createSlice } from '@reduxjs/toolkit';
import { reducers } from './reducers';
import { initialState } from './constants';

export const coreSlice = createSlice({
	initialState: initialState,
	name: 'core',
	reducers,
});
