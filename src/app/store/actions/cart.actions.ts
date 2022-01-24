import { createAction, props } from '@ngrx/store';
import { CartItem, MenuItem } from 'src/app/models/Restaurants';

export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ item: MenuItem; quantity: number }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove from Cart',
  props<{ itemID: number }>()
);

export const increaseItemQuantity = createAction(
  '[Cart] Increase item quantity',
  props<{ itemID: number }>()
);

export const decreaseItemQuantity = createAction(
  '[Cart] Decrease item quantity',
  props<{ itemID: number }>()
);

export const emptyCart = createAction('[Cart] Empty cart');
