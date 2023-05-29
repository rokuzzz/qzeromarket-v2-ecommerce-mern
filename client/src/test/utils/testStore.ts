import { favoritesReducer } from './../../redux/slices/favoritesSlice';
import { cartReducer } from './../../redux/slices/cartSlice';
import { productReducer } from './../../redux/slices/productSlice';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../../redux/slices/userSlice';

const createTestStore = () => {
  const store = configureStore({
    reducer: {
      userReducer,
      productReducer,
      cartReducer,
      favoritesReducer,
    },
  });
  return store;
};

export default createTestStore;
