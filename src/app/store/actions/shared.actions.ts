import { createAction, props } from '@ngrx/store';

export const toggleSnackbar = createAction(
  '[Snackbar] Toggle Snackbar',
  props<{ open: boolean; message: string }>()
);
