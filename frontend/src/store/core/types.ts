import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from '../types';

export type AuthParams = {
	login: string;
	password: string;
};
export type AuthResponse = { token: string; id: number };

export type User = {
	id?: number;
	first_name?: string;
	last_name?: string;
	middle_name?: string;
	birthday?: string;
	position_id?: Nnumber;
	role?: string;
	salary?: string;
	target_completion?: Nstring;
	bonuses?: Nstring;
	vacation_days?: Nnumber;
	position_days?: Nnumber;
	avatar_img?: Nstring;
	role_desc?: Nstring;
	role_name?: Nstring;
	block?: Nstring;

	isLoaded: '' | LoadingState;
	token?: Nstring;
	[K: string]: unknown;
};

export type CoreState = {
	header: {
		title: string;
	};
	user: User;
	formAuth: {
		isLoading: LoadingState | '';
		error: Nstring;
	};
};

export type CoreMainState = {
	core: CoreState;
};

export type ReducerFunction<T = null | undefined> = CaseReducer<CoreState, PayloadAction<T>>;
