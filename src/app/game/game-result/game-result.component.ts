import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { selectAuthIsLoggedIn } from 'src/app/auth/auth.selectors';
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
    this.store.pipe(select(selectAuthIsLoggedIn)).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.store.dispatch(storeResults());
      }
    });
    console.log('%cResultComponent mounted', 'background: orange; color: white;');
  }

  public getSelectedAnswerName(question: Question) {
    return question.answers.find((q) => q.id === question.chooseAnswerId).name;
  }

  public getCorrectAnswerName(question: Question) {
    return question.answers.find((q) => q.id === question.correctAnswerId).name;
  }

  ngOnDestroy() {
    console.log('%cResultComponent UNmounted', 'background: orange; color: white;');
  }
}
