import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

import * as authActions from './auth.actions';
import { AuthService } from './auth.service';
import { selectAuthState } from '../app.state';
import * as gameActions from '../game/game.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store,
  ) {}

  loginRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginRequested),
      mergeMap(() =>
        this.authService.login().pipe(
          tap((fireUser: any) => console.log('loginRequested', fireUser)),
          map((fireUser: any) =>
            authActions.loginCompleted({
              user: {
                uid: fireUser.user.uid,
                name: fireUser.user.displayName,
                photoURL: fireUser.user.photoURL,
                email: fireUser.user.email,
              },
              redirect: true,
            }),
          ),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  loginCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginCompleted),
      withLatestFrom(this.store.pipe(select(selectAuthState))),
      tap(([action, state]) => {
        if (action.redirect) {
          this.router.navigate(['/']);
        }
      }),
      map(() => gameActions.prepareGame()),
      catchError(() => EMPTY),
    ),
  );

  // loginCompleted$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(authActions.loginCompleted),
  //       withLatestFrom(this.store.pipe(select(selectAuthState))),
  //       tap(([action, state]) => {
  //         if (action.redirect) {
  //           this.router.navigate(['/']);
  //         }
  //       }),
  //     ),
  //   { dispatch: false },
  // );

  logoutRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logoutRequested),
      mergeMap(() =>
        this.authService.logout().pipe(
          map(() => authActions.logoutCompleted()),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  logoutCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logoutCompleted),
      tap(() => this.router.navigate(['/'])),
      map(() => gameActions.prepareGame()),
      catchError(() => EMPTY),
    ),
  );

  // logoutCompleted$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(authActions.logoutCompleted),
  //       tap(() => {
  //         this.router.navigate(['/']);
  //       }),
  //     ),
  //   { dispatch: false },
  // );

  autoLoginRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.autoLoginRequested),
      mergeMap(() =>
        this.authService.getAuthState().pipe(
          tap((fireUser: any) => console.log('autoLoginRequested', fireUser)),
          map((fireUser: any) =>
            fireUser
              ? authActions.loginCompleted({
                  user: {
                    uid: fireUser.uid,
                    name: fireUser.displayName,
                    photoURL: fireUser.photoURL,
                    email: fireUser.email,
                  },
                  redirect: true,
                })
              : authActions.logoutCompleted(),
          ),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
