import { createSelector } from '@ngrx/store';

import { selectAuthState } from 'src/app/app.state';
import { AuthState } from './auth.model';

export const selectAuthUser = createSelector(selectAuthState, (state: AuthState) => state.userData);
export const selectAuthIsLoggedIn = createSelector(selectAuthState, (state: AuthState) => state.isLoggedIn);
export const selectAuthLoading = createSelector(selectAuthState, (state: AuthState) => state.loading);
