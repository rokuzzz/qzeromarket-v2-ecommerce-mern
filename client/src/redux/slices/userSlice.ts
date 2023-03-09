import { LoginCredentials } from './../../types/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserSliceState } from '../../types/user'
import axios from 'axios';

const initialState: UserSliceState = {
  listOfUsers: [],
  currentUser: undefined
}

export const login = createAsyncThunk(
  'login',
  async ( { username, password }: LoginCredentials ) => {
    try {
      const user = await axios.post('https://qzero-market-backend.herokuapp.com/api/auth/login', {
        username,
        password
      })
      if (user.data) {
        const {password, accessToken, ...userInfo} = user.data
        return userInfo
      }
      return undefined
    } catch (err) {
      console.log(err)
    }
  }
)

const userSlice = createSlice({
  name: 'user slice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  }
})

export const userReducer = userSlice.reducer