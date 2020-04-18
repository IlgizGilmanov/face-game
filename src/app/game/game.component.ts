import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GameStage } from 'src/app/constants/game-stage';
import { intro } from './store/game-stage.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  gameStage$: Observable<string>;
  public stages = GameStage;

  constructor(private store: Store<{ gameStage: string }>) {
    this.gameStage$ = store.pipe(select('gameStage'));
  }

  ngOnInit(): void {
    this.store.dispatch(intro());
    console.log('%cGameComponent mounted', 'background: violet; color: white;');
  }
}
