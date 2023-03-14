import { QueryParams, ProductSliceState } from './../../types/products';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Product } from '../../types/products'

const initialState: ProductSliceState = {
  products: []
}

export const fetchAllProducts = createAsyncThunk(
  'fetchAllProducts',
  async ({sort, order, page, limit, categories}: QueryParams) => {
    try {
      const response = await axios.get(`https://qzero-market-backend.herokuapp.com/api/products?${sort}${order}${page}${limit}${categories}`)
      return (response.data ? response.data : [])
    } catch (err) {
      console.log(err)
    }
  }
)

const productSlice = createSlice({
  name: 'product slice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload
    })
  }
})

export const productReducer = productSlice.reducer