import { createSelector } from '@ngrx/store';

import { selectGame } from './game.state';
import { GameState } from './game.model';

export const selectGameState = createSelector(selectGame, (state: GameState) => state);

export const selectGameStage = createSelector(selectGameState, (state) => state.stage);
export const selectGamePersonGroups = createSelector(selectGameState, (state) => state.personGroups);
export const selectGameResults = createSelector(selectGameState, (state) => state.results);
export const selectGamePersonGroupId = createSelector(selectGameState, (state) => state.currentPersonGroupId);
export const selectGameCurrentQuestions = createSelector(selectGameState, (state) => state.currentQuestions);
export const selectGameCurrentQuestionId = createSelector(selectGameState, (state) => state.currentQuestionId);
export const selectGameCurrentResult = createSelector(selectGameState, (state) => state.currentResult);
