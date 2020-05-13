import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { prepareGame } from '../game/game.actions';
import { selectAuthUser, selectAuthIsLoggedIn, selectAuthLoading } from '../auth/auth.selectors';
import { User } from '../auth/auth.model';
import { logoutRequested, loginRequested } from '../auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public loading: boolean;
  public isLoggedIn: boolean;
  public user$: Observable<User>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.pipe(select(selectAuthLoading)).subscribe((loading) => {
      this.loading = loading;
      console.log('HeaderComponent loading', loading);
    });
    this.store.pipe(select(selectAuthIsLoggedIn)).subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      console.log('HeaderComponent isLoggedIn', isLoggedIn);
    });
    this.user$ = this.store.pipe(select(selectAuthUser));
  }

  startGame() {
    this.store.dispatch(prepareGame());
    this.router.navigate(['/game']);
    console.log('%cHeaderComponent startGame', 'background: yellow;');
  }

  openLeaderboard() {
    this.router.navigate(['/leaderboard']);
    console.log('%cHeaderComponent openLeaderboard', 'background: yellow;');
  }

  signIn() {
    this.store.dispatch(loginRequested());
    console.log('%cHeaderComponent signIn', 'background: yellow;');
  }

  logout() {
    this.store.dispatch(logoutRequested());
    console.log('%cHeaderComponent logout', 'background: yellow;');
  }
}
