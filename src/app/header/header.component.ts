import { Component, OnInit } from '@angular/core';

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
    },
    {
      icon: 'emoji_events',
      name: 'Leaderboard',
    },
    {
      icon: 'exit_to_app',
      name: 'Sign in',
    },
    {
      icon: 'power_settings_new',
      name: 'Log out',
      disabled: true,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
