import {
  GetUserByIDProps,
  UpdateUserProps,
} from '../types/userTypes';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserSliceState } from '../types/userTypes';
import axios from 'axios';

const initialState: UserSliceState = {
  data: [],
  isLoading: false,
  error: undefined,
};

export const getAllUsers = createAsyncThunk(
  'getAllUsers',
  async (token: string) => {
    try {
      const response = await axios.get(
        'https://qzero-market-backend.herokuapp.com/api/users',
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data ? response.data : [];
    } catch (err) {
      console.log(err);
    }
  }
);

export const getUserByID = createAsyncThunk(
  'getUserByID',
  async ({ id, token }: GetUserByIDProps) => {
    try {
      const response = await axios.get(
        `https://qzero-market-backend.herokuapp.com/api/users/find/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data ? response.data : undefined;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateCurrentUser = createAsyncThunk(
  'getUserByID',
  async ({ id, updatedUserData, token }: UpdateUserProps) => {
    try {
      const response = await axios.put(
        `https://qzero-market-backend.herokuapp.com/api/users/${id}`,
        updatedUserData,
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

const userSlice = createSlice({
  name: 'user slice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //  login
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state = action.payload;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;
