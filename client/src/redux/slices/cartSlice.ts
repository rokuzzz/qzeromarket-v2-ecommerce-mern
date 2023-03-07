import { createSlice } from '@reduxjs/toolkit'
import { Cart } from '../../types/cart'

const initialState: Cart = {
  id: '',
  products: []
}

const cartSlice = createSlice({
  name: 'cart slice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {

  }
})

export const cartReducer = cartSlice.reducer