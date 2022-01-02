import { createAction, props } from '@ngrx/store';

export const addCurrentUser = createAction(
  '[Auth] Add Current User',
  props<{ user: firebase.default.User | null }>()
);
