import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from 'src/app/models/Auth';
import { SharedState } from 'src/app/models/Shared';
import { authReducer } from './auth/auth.reducer';
import { sharedReducer } from './shared/shared.reducer';

export interface State {
  shared: SharedState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  shared: sharedReducer,
  auth: authReducer,
};
