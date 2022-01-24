import { createReducer, on } from '@ngrx/store';
import { CartState } from 'src/app/models/Restaurants';
import {
  addToCart,
  decreaseItemQuantity,
  emptyCart,
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
    const productsCopy = { ...state.products };
    delete productsCopy[itemID];
    return { ...state, products: { ...productsCopy } };
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
  })),
  on(emptyCart, (state) => ({
    ...state,
    products: {},
  }))
);
