import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from 'src/app/models/Auth';

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(selectAuth, (auth) => ({
  currentUser: auth.currentUser,
}));
