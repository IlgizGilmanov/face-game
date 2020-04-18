import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { result } from '../store/game-stage.actions';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss'],
})
export class GamePlayComponent implements OnInit {
  constructor(private store: Store<{ gameStage: string }>) {}

  endGame() {
    this.store.dispatch(result());
  }

  ngOnInit(): void {
    console.log('%cPlayComponent mounted', 'background: blue; color: white;');
  }
}
