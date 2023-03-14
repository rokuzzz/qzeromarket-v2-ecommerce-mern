import { productReducer } from './../../redux/slices/productSlice';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from "../../redux/slices/userSlice";

const createTestStore = () => {
  const store = configureStore({
    reducer: {
      userReducer,
      productReducer
    }
  })
  return store
}

export default createTestStore