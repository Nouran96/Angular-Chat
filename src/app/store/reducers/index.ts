import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from 'src/app/models/Auth';
import { CartState } from 'src/app/models/Restaurants';
import { SharedState } from 'src/app/models/Shared';
import { authReducer } from './auth/auth.reducer';
import { cartReducer } from './cart/cart.reducer';
import { sharedReducer } from './shared/shared.reducer';

export interface State {
  shared: SharedState;
  auth: AuthState;
  cart: CartState;
}

export const reducers: ActionReducerMap<State> = {
  shared: sharedReducer,
  auth: authReducer,
  cart: cartReducer,
};
