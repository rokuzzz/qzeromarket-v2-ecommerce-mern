import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { userReducer } from './slices/userSlice';
import { productReducer } from './slices/productSlice';
import { cartReducer } from './slices/cartSlice';
import { favoritesReducer } from './slices/favoritesSlice';

const reducers = combineReducers({
  userReducer,
  productReducer,
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
