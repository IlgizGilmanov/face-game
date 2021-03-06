import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { withLatestFrom, map, catchError, mergeMap } from 'rxjs/operators';

import { Person } from 'src/app/client-models/person';
import { PersonGroup, Result } from './game.model';
import * as gameActions from './game.actions';
import { selectGameResults, selectGamePersonGroups, selectGamePersons } from './game.selectors';
import { PersonService } from '../services/person.service';

@Injectable()
export class GameEffects {
  baseUrl = 'https://face-game-5f50e.firebaseio.com/';

  constructor(
    private actions$: Actions,
    private store: Store,
    private http: HttpClient,
    private personService: PersonService,
  ) {}

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
        this.personService.getPersons().pipe(
          map((persons: Person[]) => gameActions.setPersons({ persons })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  addPerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameActions.addPerson),
      withLatestFrom(this.store.pipe(select(selectGamePersons))),
      mergeMap(([action, persons]) =>
        this.personService.addPerson(action.person).pipe(
          map((person: Person) => gameActions.setPersons({ persons: [...persons, person] })),
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
