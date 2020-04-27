import { createAction, props } from '@ngrx/store';

import { User } from './auth.model';

export const autoLoginRequested = createAction('[Auth] Auto login requested');

export const loginRequested = createAction('[Auth] Login requested');
export const loginCompleted = createAction('[Auth] Login completed', props<{ user: User; redirect: boolean }>());

export const logoutRequested = createAction('[Auth] Logout requested');
export const logoutCompleted = createAction('[Auth] Logout completed');
