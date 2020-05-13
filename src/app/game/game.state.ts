import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import { AppState } from 'src/app/app.state';
import { gameReducer } from './game.reducer';
import { GameState } from './game.model';

export const FEATURE_NAME = 'game';
export const selectGame = createFeatureSelector<State, GameState>(FEATURE_NAME);
export const reducer = gameReducer;

export interface State extends AppState {
  game: GameState;
}
