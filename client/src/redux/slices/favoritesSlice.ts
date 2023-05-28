import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  FavoritesSliceState,
  GetUsersFavoritesProps,
} from '../../types/favorites';
import axios from 'axios';

const initialState: FavoritesSliceState = {
  usersFavorites: { _id: '', favoritesItems: [] },
};

export const getUsersFavorites = createAsyncThunk(
  'getUsersFavorites',
  async ({ userId, token }: GetUsersFavoritesProps) => {
    try {
      const response = await axios.get(
        `https://qzero-market-backend.herokuapp.com/api/carts/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data
        ? response.data
        : { id: '', products: [], totalPrice: 0 };
    } catch (err) {
      console.log(err);
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites slice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersFavorites.fulfilled, (state, action) => {
      state.usersFavorites = action.payload;
    });
  },
});

export const favoritesReducer = favoritesSlice.reducer;
