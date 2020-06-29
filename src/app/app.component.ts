import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { autoLoginRequested } from './auth/auth.actions';
import { addPerson } from './game/game.actions';
import { Person } from './client-models/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    // this.store.dispatch(autoLoginRequested());
    // const newPerson: Person = { name: `test2${new Date().getTime()}`, groupId: 1, imgPath: 'path' };
    // this.store.dispatch(addPerson({ person: newPerson }));
  }
}
