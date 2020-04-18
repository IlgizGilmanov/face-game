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
      url: '/game',
    },
    {
      icon: 'emoji_events',
      name: 'Leaderboard',
      url: '/leaderboard',
    },
    {
      icon: 'exit_to_app',
      name: 'Sign in',
      url: '',
    },
    {
      icon: 'power_settings_new',
      name: 'Log out',
      url: '',
      disabled: true,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
