import { Person } from 'src/app/client-models/person';

export enum GameStageTypes {
  INTRO = 'intro',
  PLAY = 'play',
  RESULT = 'result',
}

export interface PersonGroup {
  id: number;
  name: string;
}

export interface Answer {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  imgPath: string;
  answers: Answer[];
  correctAnswerId: number;
  chooseAnswerId: number;
}

export interface Result {
  userId: string;
  questions: Question[];
  correctCount: number;
  timeSpent: number;
  score: number;
}

export interface GameState {
  // common data
  stage: string;
  personGroups: PersonGroup[];
  persons: Person[];
  results: Result[];

  // data related to active game
  currentPersonGroupId: number;
  currentQuestions: Question[];
  currentQuestionId: number;
  currentResult: Result;
}
