import { Action, createReducer, on } from '@ngrx/store';
import sampleSize from 'lodash-es/sampleSize';
import shuffle from 'lodash-es/shuffle';

import { environment } from 'src/environments/environment';
import * as gameActions from './game.actions';
import { GameState, GameStageTypes, Person, Question, Result } from './game.model';

export const initialState: GameState = {
  stage: '',
  personGroups: [],
  persons: [],
  results: [],

  currentPersonGroupId: null,
  currentQuestions: [],
  currentQuestionId: null,
  currentResult: null,
};

const reducer = createReducer(
  initialState,
  on(gameActions.prepareGame, (state) => ({ ...state, stage: GameStageTypes.INTRO })),
  on(gameActions.startGame, (state) => {
    const filteredPersons: Person[] =
      state.currentPersonGroupId === environment.defaultPersonGroup
        ? [...state.persons]
        : state.persons.filter((person: Person) => person.groupId === state.currentPersonGroupId);

    const currentQuestions: Question[] = shuffle(
      filteredPersons.map((person: Person) => ({
        id: person.id,
        imgPath: person.imgPath,
        answers: shuffle([
          { id: person.id, name: person.name },
          ...sampleSize(
            filteredPersons.filter((p: Person) => p.id !== person.id).map((p: Person) => ({ id: p.id, name: p.name })),
            3,
          ),
        ]),
        correctAnswerId: person.id,
        chooseAnswerId: null,
      })),
    );

    return { ...state, stage: GameStageTypes.PLAY, currentQuestions, currentQuestionId: currentQuestions[0].id };
  }),
  on(gameActions.endGame, (state, { timeSpent, userId }) => {
    const correctCount = state.currentQuestions.filter((q) => q.correctAnswerId === q.chooseAnswerId).length;
    const successRate = correctCount / state.currentQuestions.length;

    const result: Result = {
      userId,
      questions: state.currentQuestions,
      correctCount,
      timeSpent,
      score: Math.trunc(((correctCount * successRate) / timeSpent) * 10000),
    };

    return { ...state, currentResult: result, results: [...state.results, result] };
  }),
  on(gameActions.showResults, (state) => ({ ...state, stage: GameStageTypes.RESULT })),

  on(gameActions.setPersonGroups, (state, { groups }) => ({ ...state, personGroups: groups ? [...groups] : [] })),
  on(gameActions.setPersons, (state, { persons }) => ({ ...state, persons: persons ? [...persons] : [] })),
  on(gameActions.setResults, (state, { results }) => ({ ...state, results: results ? [...results] : [] })),
  on(gameActions.choosePersonGroupId, (state, { groupId }) => ({ ...state, currentPersonGroupId: groupId })),

  on(gameActions.clearCurrentQuestions, (state) => ({ ...state, currentQuestions: [] })),
  on(gameActions.clearCurrentQuestionId, (state) => ({ ...state, clearcurrentQuestionId: null })),
  on(gameActions.clearCurrentResult, (state) => ({ ...state, currentResult: null })),

  on(gameActions.chooseAnswer, (state, { answerId }) => {
    const newQuestions = state.currentQuestions.map((q) =>
      q.id === state.currentQuestionId ? { ...q, chooseAnswerId: answerId } : q,
    );
    const index = state.currentQuestions.findIndex((q) => q.id === state.currentQuestionId);
    const isLastQuestion = index === state.currentQuestions.length - 1;

    return {
      ...state,
      currentQuestions: newQuestions,
      currentQuestionId: isLastQuestion ? null : state.currentQuestions[index + 1].id,
    };
  }),
);

export function gameReducer(state: GameState | undefined, action: Action) {
  return reducer(state, action);
}
