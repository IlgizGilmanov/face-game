import { createReducer, on } from '@ngrx/store';

import { GameStage } from 'src/app/constants/game-stage';
import { intro, play, result } from './game-stage.actions';

export const initialState = '';

const _gameStageReducer = createReducer(
  initialState,
  on(intro, (state) => GameStage.START),
  on(play, (state) => GameStage.PLAY),
  on(result, (state) => GameStage.RESULT),
);

export function gameStageReducer(state, action) {
  return _gameStageReducer(state, action);
}
