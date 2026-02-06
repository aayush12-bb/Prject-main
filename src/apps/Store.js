import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Reducers/cartSlice';
import wishListReducer from './Reducers/wishList';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wish: wishListReducer,
  },
});

