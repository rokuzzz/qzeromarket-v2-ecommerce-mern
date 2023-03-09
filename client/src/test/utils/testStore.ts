import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from "../../redux/slices/userSlice";

const createTestStore = () => {
  const store = configureStore({
    reducer: {
      userReducer
    }
  })
  return store
}

export default createTestStore