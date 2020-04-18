import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { GameStartComponent } from './game-start/game-start.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { GameResultComponent } from './game-result/game-result.component';

@NgModule({
  declarations: [GameComponent, GameStartComponent, GamePlayComponent, GameResultComponent],
  imports: [RouterModule, ReactiveFormsModule, GameRoutingModule, SharedModule],
})
export class GameModule {}
