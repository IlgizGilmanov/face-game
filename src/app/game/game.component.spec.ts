import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { GameComponent } from './game.component';
import {
  selectGameStage,
  selectGamePersonGroups,
  selectGamePersonGroupId,
  selectGameCurrentQuestions,
  selectGameCurrentQuestionId,
  selectGameCurrentResult,
} from './game.selectors';
import { PersonGroup, Question, Result } from './game.model';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;
  let mockSelectGameStage: MemoizedSelector<any, string>;
  let mockSelectGamePersonGroups: MemoizedSelector<any, PersonGroup[]>;
  let mockSelectGamePersonGroupId: MemoizedSelector<any, number>;
  let mockSelectGameCurrentQuestions: MemoizedSelector<any, Question[]>;
  let mockSelectGameCurrentQuestionId: MemoizedSelector<any, number>;
  let mockSelectGameCurrentResult: MemoizedSelector<any, Result>;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    mockSelectGameStage = store.overrideSelector(selectGameStage, 'start');
    mockSelectGamePersonGroups = store.overrideSelector(selectGamePersonGroups, []);
    mockSelectGamePersonGroupId = store.overrideSelector(selectGamePersonGroupId, 0);
    mockSelectGameCurrentQuestions = store.overrideSelector(selectGameCurrentQuestions, []);
    mockSelectGameCurrentQuestionId = store.overrideSelector(selectGameCurrentQuestionId, 0);
    mockSelectGameCurrentResult = store.overrideSelector(selectGameCurrentResult, null);
    loader = TestbedHarnessEnvironment.loader(fixture);

    dispatchSpy = spyOn(store, 'dispatch');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
    // expect(component).toBeTruthy();
  // });
});
