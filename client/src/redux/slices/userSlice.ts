import { GetUserByIDProps, LoginCredentials, RegisterCredentials, UpdateUserProps } from './../../types/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserSliceState } from '../../types/user'
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState: UserSliceState = {
  listOfUsers: {
    data: [],
    isLoading: false,
    error: undefined
  },
  loggedInUser: {
    data: undefined,
    isLoading: false,
    error: undefined
  },
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
      
      toast.error('Invalid credentials', {position: 'bottom-center'});
    }
  }
)

export const loginByToken = createAsyncThunk(
  'loginByToken',
  async (token: string | null) => {
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

      toast.error('Username or email already exists, please choose another', {position: 'bottom-center'});
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

export const getUserByID = createAsyncThunk(
  'getUserByID',
  async ( {id, token}: GetUserByIDProps ) => {
    try {
    const response = await axios.get(`https://qzero-market-backend.herokuapp.com/api/users/find/${id}`, {
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

export const updateCurrentUser = createAsyncThunk(
  'getUserByID',
  async ({id, updatedUserData, token}: UpdateUserProps) => {
    try {
      const response = await axios.put(`https://qzero-market-backend.herokuapp.com/api/users/${id}`, 
      updatedUserData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
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
      state.loggedInUser.data = undefined
    }
  },
  extraReducers: (builder) => {
    //  login
    builder.addCase(login.pending, (state) => {
      state.loggedInUser = {
        data: undefined,
        isLoading: true,
        error: undefined
      }
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loggedInUser = {
        data: action.payload,
        isLoading: false,
        error: undefined
      }
    })
    .addCase(login.rejected, (state, action) => {
      state.loggedInUser = {
        data: undefined,
        isLoading: false,
        error: action.error.message
      }
    })
    // loginByToken
    .addCase(loginByToken.pending, (state) => {
      state.loggedInUser = {
        data: undefined,
        isLoading: true,
        error: undefined
      }
    })
    .addCase(loginByToken.fulfilled, (state, action) => {
      state.loggedInUser = {
        data: action.payload,
        isLoading: false,
        error: undefined
      }
    })
    .addCase(loginByToken.rejected, (state, action) => {
      state.loggedInUser = {
        data: undefined,
        isLoading: false,
        error: action.error.message
      }
    })
    // register
    .addCase(register.pending, (state) => {
      state.loggedInUser = {
        data: undefined,
        isLoading: true,
        error: undefined
      }
    })
    .addCase(register.fulfilled, (state, action) => {
      state.loggedInUser = {
        data: action.payload,
        isLoading: false,
        error: undefined
      }
    })
    .addCase(register.rejected, (state, action) => {
      state.loggedInUser = {
        data: undefined,
        isLoading: false,
        error: action.error.message
      }
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.listOfUsers = action.payload
    })
    .addCase(updateCurrentUser.fulfilled, (state, action) => {
      state.loggedInUser = action.payload
    })
  }
})

export const userReducer = userSlice.reducer

export const {
  logout
} = userSlice.actions