import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SharedModule } from 'src/app/shared/shared.module';
import { FEATURE_NAME, reducer } from './game.state';
import { GameEffects } from './game.effects';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { GameStartComponent } from './game-start/game-start.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { GameResultComponent } from './game-result/game-result.component';

@NgModule({
  declarations: [GameComponent, GameStartComponent, GamePlayComponent, GameResultComponent],
  imports: [
    // angular
    RouterModule,
    ReactiveFormsModule,

    // material
    MatSelectModule,
    MatProgressBarModule,

    // ngrx
    StoreModule.forFeature(FEATURE_NAME, reducer),
    EffectsModule.forFeature([GameEffects]),

    // other
    GameRoutingModule,
    SharedModule,
  ],
})
export class GameModule {}
