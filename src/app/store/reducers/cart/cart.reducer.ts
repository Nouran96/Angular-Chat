import { createReducer, on } from '@ngrx/store';
import { CartState } from 'src/app/models/Restaurants';
import {
  addToCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeFromCart,
} from '../../actions/cart.actions';

export const initialState: CartState = {
  products: {},
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { item, quantity }) => ({
    ...state,
    products: {
      ...state.products,
      [item.id]: {
        ...item,
        quantity: (state.products[item.id]?.quantity || 0) + quantity, // Concatenate new quantity if item already in cart
      },
    },
  })),
  on(removeFromCart, (state, { itemID }) => {
    delete state.products[itemID];
    return { ...state };
  }),
  on(increaseItemQuantity, (state, { itemID }) => ({
    ...state,
    products: {
      ...state.products,
      [itemID]: {
        ...state.products[itemID],
        quantity: state.products[itemID].quantity + 1,
      },
    },
  })),
  on(decreaseItemQuantity, (state, { itemID }) => ({
    ...state,
    products: {
      ...state.products,
      [itemID]: {
        ...state.products[itemID],
        quantity: state.products[itemID].quantity - 1,
      },
    },
  }))
);
