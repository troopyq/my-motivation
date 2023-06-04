import { AllEffect, ForkEffect } from 'redux-saga/effects';
import { CoreMainState } from '../core/types';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type ApplicationState = CoreMainState;

export type GeneratorSagaType<T = void | never> = Generator<
	AllEffect<ForkEffect<T>> | ForkEffect<T>,
	void,
	unknown
>;

export type Response<T extends Record<string, any> | Record<string, any>[] = Record<string, any>> = {
	error?: Nstring;
	status: boolean;
	data?: T;
};

export enum LoadingState {
	LOADING = 'LOADING',
	RESOLVE = 'RESOLVE',
	REJECT = 'REJECT',
}

export type ReducerFunction<T = null | undefined> = CaseReducer<ApplicationState, PayloadAction<T>>;
