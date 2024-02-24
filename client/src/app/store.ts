import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { authReducer } from 'src/modules/auth/redux/authSlice';
import { userReducer } from '../modules/personal-information/redux/userSlice';
import { productReducer } from '../modules/common/redux/productSlice';
import { cartReducer } from '../modules/cart/redux/cartSlice';
import { favoritesReducer } from '../modules/favorites/redux/favoritesSlice';

const reducers = combineReducers({
  authReducer,
  productReducer,
  userReducer,
  cartReducer,
  favoritesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
