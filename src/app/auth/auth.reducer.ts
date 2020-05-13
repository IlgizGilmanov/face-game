import { Action, createReducer, on } from '@ngrx/store';

import * as authActions from './auth.actions';
import { AuthState } from './auth.model';

export const initialState: AuthState = {
  userData: null,
  isLoggedIn: false,
  loading: false,
};

const reducer = createReducer(
  initialState,
  on(authActions.autoLoginRequested, (state) => ({ ...state, loading: true })),

  on(authActions.loginCompleted, (state, { user }) => ({ ...state, userData: user, isLoggedIn: true, loading: false })),

  on(authActions.logoutRequested, (state) => ({ ...state, loading: true })),
  on(authActions.logoutCompleted, (state) => ({ ...state, userData: null, isLoggedIn: false, loading: false })),
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return reducer(state, action);
}
