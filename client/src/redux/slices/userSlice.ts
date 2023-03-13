import { LoginCredentials, RegisterCredentials } from './../../types/user';
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
        localStorage.setItem("access_token", user.data.accessToken)
        const {password, accessToken, ...userInfo} = user.data
        return userInfo
      }
      return undefined
    } catch (err) {
      console.log(err)
    }
  }
)

export const loginByToken = createAsyncThunk(
  'loginByToken',
  async (token: string) => {
    try {
      const user = await axios.get('https://qzero-market-backend.herokuapp.com/api/users/profile',
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      return (user.data ? user.data : undefined)
    } catch (err) {
      console.log(err)
    }
  }
)

export const register = createAsyncThunk(
  'register',
  async ( {firstname, lastname, username, email, password}: RegisterCredentials ) => {
    try {
      const user = await axios.post('https://qzero-market-backend.herokuapp.com/api/auth/register', {
        firstname, 
        lastname, 
        username, 
        email, 
        password
      })
      return (user.data? user.data : undefined)
    } catch (err) {
      console.log(err)
    }
  }
)

const userSlice = createSlice({
  name: 'user slice',
  initialState: initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('access_token')
      state.currentUser = undefined
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
    .addCase(loginByToken.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
    .addCase(register.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  }
})

export const userReducer = userSlice.reducer

export const {
  logout
} = userSlice.actions