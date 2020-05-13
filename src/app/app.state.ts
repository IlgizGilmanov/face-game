import { AuthState } from 'src/app/auth/auth.model';

import * as fromAuth from 'src/app/auth/auth.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
};

export const selectAuthState = createFeatureSelector<AppState, AuthState>('auth');

export interface AppState {
  auth: AuthState;
}
