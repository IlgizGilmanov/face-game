import { createAction, props } from '@ngrx/store';

import { PersonGroup, Person, Result } from './game.model';

export const prepareGame = createAction('[Game] Prepare game');
export const startGame = createAction('[Game] Start game');
export const endGame = createAction('[Game] End game', props<{ timeSpent: number }>());
export const showResults = createAction('[Game] Show results');

export const fetchPersonGroups = createAction('[Game] Fetch person groups');
export const setPersonGroups = createAction('[Game] Set person groups', props<{ groups: PersonGroup[] }>());
export const fetchPersons = createAction('[Game] Fetch persons');
export const setPersons = createAction('[Game] Set persons', props<{ persons: Person[] }>());
export const fetchResults = createAction('[Game] Fetch results');
export const setResults = createAction('[Game] Set results', props<{ results: Result[] }>());
export const storeResults = createAction('[Game] Store results');
export const storeResultsSuccess = createAction('[Game] Store results success');

export const selectPersonGroupId = createAction('[Game] Select person group', props<{ groupId: number }>());

export const clearCurrentQuestions = createAction('[Game] Clear current questions');
export const clearCurrentQuestionId = createAction('[Game] Clear current question');
export const clearCurrentResult = createAction('[Game] Clear current result');

export const selectAnswer = createAction('[Game] Select an answer', props<{ answerId: number }>());
