import { Component, OnInit, OnDestroy, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { timer, Subscription, Observable } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import sample from 'lodash-es/sample';

import { environment } from 'src/environments/environment';
import { THEME_COLORS } from 'src/app/constants/themeColors';
import { chooseAnswer, endGame, showResults } from '../game.actions';
import { Question } from '../game.model';
import { User } from 'src/app/auth/auth.model';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss'],
})
export class GamePlayComponent implements OnChanges, OnInit, OnDestroy {
  @Input() questions$: Observable<Question[]>;
  @Input() currentQuestionId: number;
  @Input() user: User;

  private timerSub: Subscription;
  public timeLeft: number = environment.countdownInitialTime;
  public displayedTimeLeft: string = environment.countdownInitialTime.toString();
  public progressBarTimeLeft = 0;
  public progressBarTheme: ThemePalette = 'primary';
  public personType = environment.personType;
  public buttonsTheme: ThemePalette;

  constructor(private store: Store) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('currentQuestionId' in changes && !this.currentQuestionId) {
      this.endGame();
    }
  }

  ngOnInit(): void {
    const countdownTimer = timer(0, 100);
    this.timerSub = countdownTimer.subscribe((val) => {
      if (this.timeLeft <= 0) {
        this.endGame();
        return;
      }

      this.timeLeft = environment.countdownInitialTime - val;

      if (this.timeLeft < environment.countdownDeadline) {
        this.displayedTimeLeft = (this.timeLeft / 10).toFixed(1);
        this.progressBarTheme = 'warn' as ThemePalette;
      } else {
        this.displayedTimeLeft = (this.timeLeft / 10).toFixed();
      }

      if (this.timeLeft % 10 === 0) {
        this.progressBarTimeLeft = (100 / environment.countdownInitialTime) * val;
      }
    });

    this.setButtonTheme();
    console.log('%cPlayComponent mounted', 'background: blue; color: white;');
  }

  public chooseAnAnswer(answerId: number) {
    this.store.dispatch(chooseAnswer({ answerId }));
    this.setButtonTheme();
  }

  private stopTimer() {
    this.timerSub.unsubscribe();
  }

  private endGame() {
    this.stopTimer();
    this.store.dispatch(
      endGame({
        timeSpent: environment.countdownInitialTime - this.timeLeft,
        userId: this.user ? this.user.uid : null,
      }),
    );
    setTimeout(() => {
      this.store.dispatch(showResults());
    });
  }

  private setButtonTheme() {
    this.buttonsTheme = sample(THEME_COLORS);
  }

  ngOnDestroy() {
    this.stopTimer();
    console.log('%cPlayComponent UNmounted', 'background: blue; color: white;');
  }
}
