import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from 'src/app/models/Restaurants';

export const selectCart = createFeatureSelector<CartState>('cart');

export const selectCartProducts = createSelector(selectCart, (cart) => ({
  products: cart.products,
}));
