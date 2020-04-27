import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { withLatestFrom, map, catchError, mergeMap } from 'rxjs/operators';

import { PersonGroup, Person, Result } from './game.model';
import * as gameActions from './game.actions';
import { selectGameResults } from './game.selectors';

@Injectable()
export class GameEffects {
  baseUrl = 'https://face-game-5f50e.firebaseio.com/';

  constructor(private actions$: Actions, private store: Store, private http: HttpClient) {}

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
}
