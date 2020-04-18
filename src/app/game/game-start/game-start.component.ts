import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { play } from '../store/game-stage.actions';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss'],
})
export class GameStartComponent implements OnInit {
  constructor(private store: Store<{ gameStage: string }>) {}

  playGame() {
    this.store.dispatch(play());
  }

  ngOnInit(): void {
    console.log('%cStartComponent mounted', 'background: green; color: white;');
  }
}
