import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { intro } from 'src/app/game/store/game-stage.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headerMenuItems = [
    {
      icon: 'face',
      name: 'Start game',
      handler: 'startGame',
    },
    {
      icon: 'emoji_events',
      name: 'Leaderboard',
      handler: 'openLeaderboard',
    },
    {
      icon: 'exit_to_app',
      name: 'Sign in',
      handler: 'signIn',
    },
    {
      icon: 'power_settings_new',
      name: 'Log out',
      handler: 'logout',
      disabled: true,
    },
  ];

  constructor(private store: Store<{ gameStage: string }>, private router: Router) {}

  ngOnInit(): void {}

  startGame() {
    this.store.dispatch(intro());
    this.router.navigate(['/game']);
    console.log('%cHeaderComponent startGame', 'background: black; color: white;');
  }

  openLeaderboard() {
    this.router.navigate(['/leaderboard']);
    console.log('%cHeaderComponent openLeaderboard', 'background: black; color: white;');
  }

  signIn() {
    console.log('%cHeaderComponent signIn', 'background: black; color: white;');
  }

  logout() {
    console.log('%cHeaderComponent logout', 'background: black; color: white;');
  }
}
