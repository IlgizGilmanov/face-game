import { createSelector } from '@ngrx/store';

import { selectGame } from './game.state';
import { GameState } from './game.model';

export const selectGameState = createSelector(selectGame, (state: GameState) => state);

export const selectGameStage = createSelector(selectGameState, (state: GameState) => state.stage);
export const selectGamePersonGroups = createSelector(selectGameState, (state: GameState) => state.personGroups);
export const selectGamePersons = createSelector(selectGameState, (state: GameState) => state.persons);
export const selectGameResults = createSelector(selectGameState, (state: GameState) => state.results);
export const selectGamePersonGroupId = createSelector(
  selectGameState,
  (state: GameState) => state.currentPersonGroupId,
);
export const selectGameCurrentQuestions = createSelector(selectGameState, (state: GameState) => state.currentQuestions);
export const selectGameCurrentQuestionId = createSelector(
  selectGameState,
  (state: GameState) => state.currentQuestionId,
);
export const selectGameCurrentResult = createSelector(selectGameState, (state: GameState) => state.currentResult);
