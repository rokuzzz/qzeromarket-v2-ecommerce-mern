import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  FavoritesSliceState,
  GetUsersFavoritesProps,
} from '../../types/favorites';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

const initialState: FavoritesSliceState = {
  usersFavorites: {
    _id: '',
    favoritesItems: [],
  },
  isLoading: false,
  error: undefined,
};

export const getUsersFavorites = createAsyncThunk(
  'getUsersFavorites',
  async ({ userId, token }: GetUsersFavoritesProps) => {
    try {
      const response = await axios.get(
        `https://qzero-market-backend.herokuapp.com/api/favorites/${userId}`,
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
    // getUsersFavorites
    builder
      .addCase(getUsersFavorites.pending, (state) => {
        state.usersFavorites = { _id: '', favoritesItems: [] };
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getUsersFavorites.fulfilled, (state, action) => {
        state.usersFavorites = action.payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getUsersFavorites.rejected, (state, action) => {
        state.usersFavorites = { _id: '', favoritesItems: [] };
        state.isLoading = true;
        state.error = action.error.message;
      });
  },
});

export const favoritesReducer = favoritesSlice.reducer;
