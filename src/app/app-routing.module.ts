import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: '/game', pathMatch: 'full' },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then((m) => m.GameModule),
  },
  {
    path: 'leaderboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./leaderboard/leaderboard.module').then((m) => m.LeaderboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
