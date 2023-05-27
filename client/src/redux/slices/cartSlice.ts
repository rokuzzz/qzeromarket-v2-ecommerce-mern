import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';

import { CartSliceState, GetUsersShoppingCartProps, AddToCartProps, DeleteCartProps } from '../../types/cart'

const initialState: CartSliceState = {
  usersShoppingCart: { id: '', cartItems: [], totalPrice: 0 }
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
      
      return (response.data ? response.data : {id: '', products: [], totalPrice: 0})
    } catch (err) {
      console.log(err)
    }
  }
)

export const addToCart = createAsyncThunk(
  'addToCart', 
  async ({title, quantity, token}: AddToCartProps) => {
    try {
      const response = await axios.post('https://qzero-market-backend.herokuapp.com/api/carts',
      {title, quantity},
    {
        headers: {
          Authorization: `Bearer ${token}`
      }})

      return response.data
    } catch (err) {
      console.log(err)

      toast.error('Something went wrong', {position: 'bottom-right'});
    }
  }
)

export const deleteCart = createAsyncThunk(
  'deleteCart',
  async ({id, token}: DeleteCartProps) => {
    await axios.post(`http://localhost:5000/api/carts/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }})

    return {id: '', cartItems: []}
  }
)

const cartSlice = createSlice({
  name: 'cart slice',
  initialState: initialState,
  reducers: {
    countTotalPrice: (state) => {
      let totalPrice = 0
      if (state.usersShoppingCart?.cartItems) {
        for (let i = 0; i < state.usersShoppingCart.cartItems.length; i++) {
          totalPrice += state.usersShoppingCart.cartItems[i].quantity * state.usersShoppingCart.cartItems[i].cartItemDetails.price
        }
        state.usersShoppingCart.totalPrice = totalPrice
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersShoppingCart.fulfilled, (state, action) => {
      state.usersShoppingCart = action.payload
    })
    .addCase(addToCart.fulfilled, (state, action) => {
      state.usersShoppingCart = action.payload
    })
    .addCase(deleteCart.fulfilled, (state, action) => {
      state.usersShoppingCart = action.payload
    })
  }
})

export const cartReducer = cartSlice.reducer

export const {
  countTotalPrice
} = cartSlice.actions