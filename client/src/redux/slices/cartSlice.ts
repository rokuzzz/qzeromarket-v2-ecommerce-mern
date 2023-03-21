import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { CartSliceState, GetUsersShoppingCartProps } from '../../types/cart'

const initialState: CartSliceState = {
  usersShoppingCart: {
    id: '',
    products: []
  },
  allCarts: []
}

export const getUsersShoppingCart = createAsyncThunk(
  'getUsersShoppingCart',
  async ({userId, token}: GetUsersShoppingCartProps) => {
    try {
      const response = await axios.get(`https://qzero-market-backend.herokuapp.com/api/carts/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return (response.data ? response.data : {id: '', products: []})
    } catch (err) {
      console.log(err)
    }
  }
)

const cartSlice = createSlice({
  name: 'cart slice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersShoppingCart.fulfilled, (state, action) => {
      state.usersShoppingCart = action.payload
    })
  }
})

export const cartReducer = cartSlice.reducer