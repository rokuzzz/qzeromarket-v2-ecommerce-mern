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
      const response = await axios.post('https://qzero-market-backend.herokuapp.com/api/auth/login', {
        username,
        password
      })
      if (response.data) {
        localStorage.setItem("access_token", response.data.accessToken)
        const {password, accessToken, ...userInfo} = response.data
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
      const response = await axios.get('https://qzero-market-backend.herokuapp.com/api/users/profile',
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      return (response.data ? response.data : undefined)
    } catch (err) {
      console.log(err)
    }
  }
)

export const register = createAsyncThunk(
  'register',
  async ( {firstname, lastname, username, email, password}: RegisterCredentials ) => {
    try {
      const response = await axios.post('https://qzero-market-backend.herokuapp.com/api/auth/register', {
        firstname, 
        lastname, 
        username, 
        email, 
        password
      })
      return (response.data? response.data : undefined)
    } catch (err) {
      console.log(err)
    }
  }
)

export const getAllUsers = createAsyncThunk(
  'getAllUsers',
  async (token: string) => {
    try {
      const response = await axios.get('https://qzero-market-backend.herokuapp.com/api/users', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      return (response.data ? response.data : [])
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
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.listOfUsers = action.payload
    })
  }
})

export const userReducer = userSlice.reducer

export const {
  logout
} = userSlice.actions