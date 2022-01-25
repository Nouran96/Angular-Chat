import { createReducer, on } from '@ngrx/store';
import { SharedState } from 'src/app/models/Shared';
import { toggleSnackbar } from '../../actions/shared.actions';

export const initialState: SharedState = {
  openSnackbar: false,
  message: '',
  className: '',
};

export const sharedReducer = createReducer(
  initialState,
  on(toggleSnackbar, (state, { open, message, className }) => ({
    ...state,
    openSnackbar: open,
    message,
    className,
  }))
);
