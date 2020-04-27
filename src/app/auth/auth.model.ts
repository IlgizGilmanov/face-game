export interface User {
  uid: string; // user.uid
  name: string; // user.displayName
  photoURL: string; // user.photoURL
  email: string; // user.email
}

export interface AuthState {
  userData: User;
  isLoggedIn: boolean;
  loading: boolean;
}
