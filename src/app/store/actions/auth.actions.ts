import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/Auth';

export const addCurrentUser = createAction(
  '[Auth] Add Current User',
  props<{ user: User | null }>()
);
