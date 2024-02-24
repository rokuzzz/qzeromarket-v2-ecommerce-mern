import { favoritesReducer } from '../../modules/favorites/redux/favoritesSlice';
import { cartReducer } from '../../modules/cart/redux/cartSlice';
import { productReducer } from '../../modules/common/redux/productSlice';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../../modules/personal-information/redux/userSlice';

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
