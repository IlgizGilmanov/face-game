import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { GameStageTypes, PersonGroup, Question, Result } from './game.model';
import { prepareGame, choosePersonGroupId } from './game.actions';
import {
  selectGameStage,
  selectGamePersonGroups,
  selectGamePersonGroupId,
  selectGameCurrentQuestions,
  selectGameCurrentQuestionId,
  selectGameCurrentResult,
} from './game.selectors';
import { selectAuthIsLoggedIn, selectAuthLoading, selectAuthUser } from '../auth/auth.selectors';
import { User } from '../auth/auth.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public isLoggedIn: boolean;
  public user: User;
  public loading: boolean;
  public gameStage$: Observable<string>;
  public stages = GameStageTypes;
  public personGroups$: Observable<PersonGroup[]>;
  public personGroupId: number;
  public questions$: Observable<Question[]>;
  public currentQuestionId: number;
  public result$: Observable<Result>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.pipe(select(selectAuthIsLoggedIn)).subscribe((isLoggedIn) => (this.isLoggedIn = isLoggedIn));
    this.store.pipe(select(selectAuthUser)).subscribe((user) => (this.user = user));
    this.store.pipe(select(selectAuthLoading)).subscribe((loading) => (this.loading = loading));
    this.gameStage$ = this.store.pipe(select(selectGameStage));
    this.personGroups$ = this.store.pipe(select(selectGamePersonGroups));
    this.store.pipe(select(selectGamePersonGroupId)).subscribe((personGroupId) => {
      if (!personGroupId) {
        this.store.dispatch(choosePersonGroupId({ groupId: environment.defaultPersonGroup }));
      } else {
        this.personGroupId = personGroupId;
      }
    });
    this.questions$ = this.store.pipe(select(selectGameCurrentQuestions));
    this.store
      .pipe(select(selectGameCurrentQuestionId))
      .subscribe((currentQuestionId) => (this.currentQuestionId = currentQuestionId));
    this.result$ = this.store.pipe(select(selectGameCurrentResult));

    this.store.dispatch(prepareGame());
    console.log('%cGameComponent mounted', 'background: violet; color: white;');
  }
}
