import { ApplicationState, LoadingState } from '../types';
import { CoreState, User } from './types';

const titleHeader = (state: ApplicationState): string => state.core.header.title;

const formLoading = (state: ApplicationState): boolean =>
	state.core.formAuth.isLoading === LoadingState.LOADING;

const formError = (state: ApplicationState): Nstring => state.core.formAuth.error;

const user = (state: ApplicationState): User => state.core.user;

export const coreSelectors = { titleHeader, formLoading, formError, user };
