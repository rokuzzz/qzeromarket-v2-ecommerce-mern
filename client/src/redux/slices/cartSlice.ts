import { createSlice } from '@reduxjs/toolkit'
import { CartSliceState } from '../../types/cart'

const initialState: CartSliceState = {
  usersShoppingCart: {
    id: '',
    products: []
  },
  allCarts: []
}

const cartSlice = createSlice({
  name: 'cart slice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {

  }
})

export const cartReducer = cartSlice.reducer