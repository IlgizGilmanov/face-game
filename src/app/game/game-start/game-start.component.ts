import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { PersonGroup } from '../game.model';
import {
  fetchPersonGroups,
  fetchPersons,
  startGame,
  selectPersonGroupId,
  clearCurrentQuestions,
  clearCurrentQuestionId,
  clearCurrentResult,
  fetchResults,
} from '../game.actions';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss'],
})
export class GameStartComponent implements OnInit, OnDestroy {
  public personType = environment.personTypePlural;
  @Input() personGroups$: Observable<PersonGroup[]>;
  @Input() personGroupId: number;
  // isStartPreparing = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(clearCurrentQuestions());
    this.store.dispatch(clearCurrentQuestionId());
    this.store.dispatch(clearCurrentResult());

    this.store.dispatch(fetchPersons());
    this.store.dispatch(fetchPersonGroups());
    this.store.dispatch(fetchResults());

    console.log('%cStartComponent mounted', 'background: green; color: white;');
  }

  public groupChanged({ value }) {
    this.store.dispatch(selectPersonGroupId({ groupId: value }));
  }

  public playGame() {
    this.store.dispatch(startGame());
  }

  ngOnDestroy() {
    console.log('%cStartComponent UNmounted', 'background: green; color: white;');
  }
}
