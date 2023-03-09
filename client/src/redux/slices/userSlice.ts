import { createSlice } from '@reduxjs/toolkit'
import { User, UserSliceState } from '../../types/user'

const initialState: UserSliceState = {
  listOfUsers: [],
  currentUser: undefined
}

const userSlice = createSlice({
  name: 'user slice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {

  }
})

export const userReducer = userSlice.reducer