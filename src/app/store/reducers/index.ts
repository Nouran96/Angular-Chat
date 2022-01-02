import { ActionReducerMap } from '@ngrx/store';
import { SharedState } from 'src/app/models/Shared';
import { sharedReducer } from './shared/shared.reducer';

export interface State {
  shared: SharedState;
}

export const reducers: ActionReducerMap<State> = {
  shared: sharedReducer,
};
