// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseAPIKey: 'AIzaSyAXtkJTMEwhDVXBPzHCGr-hdGiopWh9bZU',
  defaultPersonGroup: 1,
  personType: 'superhero',
  personTypePlural: 'superheroes',
  countdownInitialTime: 300, // seconds * 10
  countdownDeadline: 50, // seconds * 10
  firebaseConfig: {
    apiKey: 'AIzaSyAXtkJTMEwhDVXBPzHCGr-hdGiopWh9bZU',
    authDomain: 'face-game-5f50e.firebaseapp.com',
    databaseURL: 'https://face-game-5f50e.firebaseio.com',
    projectId: 'face-game-5f50e',
    storageBucket: 'face-game-5f50e.appspot.com',
    messagingSenderId: '967476099490',
    appId: '1:967476099490:web:0e9dc54c3357079dd29afb',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
