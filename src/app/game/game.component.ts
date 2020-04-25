import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { GameStageTypes, PersonGroup, Question, Result } from './game.model';
import { prepareGame, selectPersonGroupId } from './game.actions';
import {
  selectGameStage,
  selectGamePersonGroups,
  selectGamePersonGroupId,
  selectGameCurrentQuestions,
  selectGameCurrentQuestionId,
  selectGameCurrentResult,
} from './game.selectors';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public gameStage$: Observable<string>;
  public stages = GameStageTypes;
  public personGroups$: Observable<PersonGroup[]>;
  public personGroupId: number;
  public questions$: Observable<Question[]>;
  public currentQuestionId: number;
  public result$: Observable<Result>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.gameStage$ = this.store.pipe(select(selectGameStage));
    this.personGroups$ = this.store.pipe(select(selectGamePersonGroups));
    this.store.pipe(select(selectGamePersonGroupId)).subscribe((personGroupId) => {
      if (!personGroupId) {
        this.store.dispatch(selectPersonGroupId({ groupId: environment.defaultPersonGroup }));
      } else {
        this.personGroupId = personGroupId;
      }
    });
    this.questions$ = this.store.pipe(select(selectGameCurrentQuestions));
    this.store.pipe(select(selectGameCurrentQuestionId)).subscribe((currentQuestionId) => {
      this.currentQuestionId = currentQuestionId;
    });
    this.result$ = this.store.pipe(select(selectGameCurrentResult));

    this.store.dispatch(prepareGame());
    console.log('%cGameComponent mounted', 'background: violet; color: white;');
  }
}
