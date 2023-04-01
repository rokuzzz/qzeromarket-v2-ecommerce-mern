import { userReducer } from './slices/userSlice';
import { productReducer } from './slices/productSlice';
import { cartReducer } from './slices/cartSlice';
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    userReducer,
    productReducer,
    cartReducer

  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store