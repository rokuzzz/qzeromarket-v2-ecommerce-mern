import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../../types/products'

const initialState: Product[] = []

const productSlice = createSlice({
  name: 'product slice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {

  }
})

export const productReducer = productSlice.reducer