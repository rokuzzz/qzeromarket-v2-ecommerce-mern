import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  DeleteFavoritesProps,
  FavoritesSliceState,
  GetAllFavoritesProps,
  GetUsersFavoritesProps,
  ModifyFavoritesProps,
} from '../../types/favorites';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState: FavoritesSliceState = {
  usersFavorites: {
    data: { _id: '', favoritesItems: [] },
    isLoading: false,
    error: undefined,
  },
  allFavorites: {
    data: [],
    isLoading: false,
    error: undefined,
  },
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

export const modifyFavorites = createAsyncThunk(
  'modifyFavorites',
  async ({ title, token }: ModifyFavoritesProps) => {
    try {
      const response = await axios.post(
        'https://qzero-market-backend.herokuapp.com/api/favorites',
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.log(err);

      toast.error('Something went wrong', { position: 'bottom-right' });
    }
  }
);

export const getAllFavorites = createAsyncThunk(
  'getAllFavorites',
  async ({ token }: GetAllFavoritesProps) => {
    try {
      const response = await axios.get(
        'https://qzero-market-backend.herokuapp.com/api/favorites',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteFavorites = createAsyncThunk(
  'deleteFavorites',
  async ({ id, token }: DeleteFavoritesProps) => {
    await axios.post(`http://localhost:5000/api/favorites/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { _id: '', favoritesItems: [] };
  }
);

const favoritesSlice = createSlice({
  name: 'favorites slice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getUsersFavorites
      .addCase(getUsersFavorites.pending, (state) => {
        state.usersFavorites = {
          data: { _id: '', favoritesItems: [] },
          isLoading: true,
          error: undefined,
        };
      })
      .addCase(getUsersFavorites.fulfilled, (state, action) => {
        state.usersFavorites = {
          data: action.payload,
          isLoading: false,
          error: undefined,
        };
      })
      .addCase(getUsersFavorites.rejected, (state, action) => {
        state.usersFavorites = {
          data: { _id: '', favoritesItems: [] },
          isLoading: false,
          error: action.error.message,
        };
      })
      // modifyFavorites
      .addCase(modifyFavorites.fulfilled, (state, action) => {
        state.usersFavorites = action.payload;
      })
      // getAllFavorites
      .addCase(getAllFavorites.pending, (state) => {
        state.allFavorites = {
          data: [],
          isLoading: true,
          error: undefined,
        };
      })
      .addCase(getAllFavorites.fulfilled, (state, action) => {
        state.allFavorites = {
          data: action.payload,
          isLoading: false,
          error: undefined,
        };
      })
      .addCase(getAllFavorites.rejected, (state, action) => {
        state.allFavorites = {
          data: [],
          isLoading: false,
          error: action.error.message,
        };
      })
      // deleteFavorites
      .addCase(getAllFavorites.fulfilled, (state, action) => {
        state.usersFavorites = {
          data: action.payload,
          isLoading: false,
          error: undefined,
        };
      });
  },
});

export const favoritesReducer = favoritesSlice.reducer;
