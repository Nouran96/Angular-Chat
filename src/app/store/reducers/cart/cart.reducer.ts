import { createReducer, on } from '@ngrx/store';
import { CartState } from 'src/app/models/Restaurants';
import {
  addToCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeFromCart,
} from '../../actions/cart.actions';

export const initialState: CartState = {
  products: [],
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { item, quantity }) => ({
    ...state,
    products: [...state.products, { item, quantity }],
  })),
  on(removeFromCart, (state, { itemID }) => ({
    ...state,
    products: state.products.filter((pro) => pro.item.id !== itemID),
  })),
  on(increaseItemQuantity, (state, { itemID }) => ({
    ...state,
    products: state.products.map((pro) => {
      if (pro.item.id === itemID) pro.quantity++;

      return pro;
    }),
  })),
  on(decreaseItemQuantity, (state, { itemID }) => ({
    ...state,
    products: state.products.map((pro) => {
      if (pro.item.id === itemID) pro.quantity--;

      return pro;
    }),
  }))
);
