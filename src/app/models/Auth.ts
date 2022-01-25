export interface AuthState {
  currentUser: User | null;
}

export type User = firebase.default.User & { isAdmin?: boolean };
