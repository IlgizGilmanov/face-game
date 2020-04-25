import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Question, Result } from '../game.model';
import { storeResults } from '../game.actions';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss'],
})
export class GameResultComponent implements OnInit, OnDestroy {
  @Input() result$: Observable<Result>;
  public personType = environment.personType;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(storeResults());
    console.log('%cResultComponent mounted', 'background: orange; color: white;');
  }

  public getSelectedAnswerName(question: Question) {
    return question.answers.find((q) => q.id === question.selectedAnswerId).name;
  }

  public getCorrectAnswerName(question: Question) {
    return question.answers.find((q) => q.id === question.correctAnswerId).name;
  }

  ngOnDestroy() {
    console.log('%cResultComponent UNmounted', 'background: orange; color: white;');
  }
}
