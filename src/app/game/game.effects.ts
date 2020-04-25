import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, forkJoin, of } from 'rxjs';
import { tap, withLatestFrom, switchMap, map, catchError, mergeMap } from 'rxjs/operators';

import { State } from './game.state';
import { PersonGroup, Person, Result } from './game.model';
import * as gameActions from './game.actions';
import { selectGamePersonGroupId, selectGameStage, selectGameState, selectGameResults } from './game.selectors';
import { dispatch } from 'rxjs/internal/observable/pairs';

@Injectable()
export class GameEffects {
  baseUrl = 'https://face-game-5f50e.firebaseio.com/';

  constructor(private actions$: Actions, private store: Store<State>, private http: HttpClient) {}

  fetchPersonGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameActions.fetchPersonGroups),
      mergeMap(() =>
        this.http.get<PersonGroup[]>(`${this.baseUrl}personGroups.json`).pipe(
          map((groups: PersonGroup[]) => gameActions.setPersonGroups({ groups })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  fetchPersons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameActions.fetchPersons),
      mergeMap(() =>
        this.http.get<Person[]>(`${this.baseUrl}persons.json`).pipe(
          map((persons: Person[]) => gameActions.setPersons({ persons })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  fetchResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameActions.fetchResults),
      mergeMap(() =>
        this.http.get<Result[]>(`${this.baseUrl}results.json`).pipe(
          map((results: Result[]) => gameActions.setResults({ results })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  storeResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameActions.storeResults),
      withLatestFrom(this.store.pipe(select(selectGameResults))),
      mergeMap(([action, results]) =>
        this.http.put<Result[]>(`${this.baseUrl}results.json`, results).pipe(
          map(() => gameActions.storeResultsSuccess()),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  // endGame$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(gameActions.endGame),
  //       tap(() => gameActions.showResults()),
  //       // mergeMap(
  //         // this.http.get<Person[]>(`${this.baseUrl}persons.json`).pipe(
  //         //   map((persons: Person[]) => gameActions.setPersons({ persons })),
  //         //   catchError(() => EMPTY),
  //         // ),
  //       ),
  //     ),
  // );

  // summarizing$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(gameActions.endGame),
  //       withLatestFrom(this.store.pipe(select(selectGameState))),
  //       tap(([action, state]) => {
  //         console.log('action', action);
  //         console.log('state', state);
  //         const correctCount = state.currentQuestions.filter((q) => q.correctAnswerId === q.selectedAnswerId).length;
  //         const successRate = correctCount / state.currentQuestions.length;

  //         const result: Result = {
  //           questions: state.currentQuestions,
  //           correctCount,
  //           timeSpent: state.currentResult.timeSpent,
  //           score: Math.trunc(((correctCount * successRate) / state.currentResult.timeSpent) * 10000),
  //         };

  //         console.log('result', result);

  //         return this.store.dispatch(gameActions.showResults());

  //         // return this.http.put(`${this.baseUrl}results.json`, recipesState.recipes);
  //       }),
  //     ),
  //   { dispatch: false },
  // );

  // logGameStage = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(gameActions.prepareGame, gameActions.startGame, gameActions.endGame),
  //       withLatestFrom(this.store.pipe(select(selectGameStage))),
  //       tap(([action, stage]) =>
  //         console.log('%cEffects Actual game stage:', 'background: black; color: white;', stage),
  //       ),
  //     ),
  //   { dispatch: false },
  // );
}
