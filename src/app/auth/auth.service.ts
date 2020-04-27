import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { auth } from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class AuthService {
  constructor(private fireAuth: AngularFireAuth) {}

  login(): Observable<any> {
    return this.fromFirebaseAuthPromise(this.fireAuth.signInWithPopup(new auth.GoogleAuthProvider()));
  }

  logout(): Observable<any> {
    return this.fromFirebaseAuthPromise(this.fireAuth.signOut());
  }

  getAuthState(): Observable<firebase.User> {
    return this.fireAuth.authState;
  }

  private fromFirebaseAuthPromise(promise): Observable<any> {
    return from(promise as Promise<any>);
  }
}
