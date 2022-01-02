import { createReducer, on } from '@ngrx/store';
import { AuthState } from 'src/app/models/Auth';
import { addCurrentUser } from '../../actions/auth.actions';

export const initialState: AuthState = {
  currentUser: null,
};

export const authReducer = createReducer(
  initialState,
  on(addCurrentUser, (state, { user }) => ({
    ...state,
    currentUser: user,
  }))
);
