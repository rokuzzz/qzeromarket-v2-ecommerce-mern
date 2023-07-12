import {
  QueryParams,
  ProductSliceState,
  CreateProductProps,
  DeleteProductProps,
  UpdateProductParams,
} from './../../types/products';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: ProductSliceState = {
  allProducts: {
    data: [],
    isLoading: false,
    error: undefined,
  },
  bestsellers: {
    data: [],
    isLoading: false,
    error: undefined,
  },
  newProducts: {
    data: [],
    isLoading: false,
    error: undefined,
  },
  currentProduct: {
    data: undefined,
    isLoading: false,
    error: undefined,
  },
};

export const fetchFilteredProducts = createAsyncThunk(
  'fetchAllProducts',
  async ({ sort, order, page, limit, categories }: QueryParams) => {
    try {
      const response = await axios.get(
        `https://qzero-market-backend.herokuapp.com/api/products?${sort}${order}${page}${limit}${categories}`
      );
      return response.data ? response.data : [];
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchBestsellers = createAsyncThunk(
  'fetchBestsellers',
  async () => {
    try {
      const response = await axios.get(
        `https://qzero-market-backend.herokuapp.com/api/products?categories=Bestsellers&limit=1000`
      );
      return response.data ? response.data : [];
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchNewProducts = createAsyncThunk(
  'fetchNewProducts',
  async () => {
    try {
      const response = await axios.get(
        `https://qzero-market-backend.herokuapp.com/api/products?categories=New&limit=1000`
      );
      return response.data ? response.data : [];
    } catch (err) {
      console.log(err);
    }
  }
);

export const getProductByID = createAsyncThunk(
  'getProductByID',
  async (id: string | undefined) => {
    try {
      const response = await axios.get(
        `https://qzero-market-backend.herokuapp.com/api/products/${id}`
      );
      return response.data ? response.data : undefined;
    } catch (err) {
      console.log(err);
    }
  }
);

export const createProduct = createAsyncThunk(
  'createProduct',
  async ({ newProduct, token }: CreateProductProps) => {
    try {
      await axios.post(
        'https://qzero-market-backend.herokuapp.com/api/products',
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const response = await axios.get(
        'https://qzero-market-backend.herokuapp.com/api/products?'
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'updateProduct',
  async ({ id, updatedProductData, token }: UpdateProductParams) => {
    try {
      await axios.put(
        `https://qzero-market-backend.herokuapp.com/api/products/${id}`,
        updatedProductData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await axios.get(
        'https://qzero-market-backend.herokuapp.com/api/products?'
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async ({ id, token }: DeleteProductProps) => {
    try {
      await axios.delete(
        `https://qzero-market-backend.herokuapp.com/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await axios.get(
        'https://qzero-market-backend.herokuapp.com/api/products'
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const productSlice = createSlice({
  name: 'product slice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchFilteredProducts
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.allProducts = {
          data: [],
          isLoading: true,
          error: undefined,
        };
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.allProducts = {
          data: action.payload,
          isLoading: false,
          error: undefined,
        };
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.allProducts = {
          data: [],
          isLoading: false,
          error: action.error.message,
        };
      })
      // fetchBestsellers
      .addCase(fetchBestsellers.pending, (state) => {
        state.bestsellers = {
          data: [],
          isLoading: true,
          error: undefined,
        };
      })
      .addCase(fetchBestsellers.fulfilled, (state, action) => {
        state.bestsellers = {
          data: action.payload,
          isLoading: false,
          error: undefined,
        };
      })
      .addCase(fetchBestsellers.rejected, (state, action) => {
        state.bestsellers = {
          data: [],
          isLoading: false,
          error: action.error.message,
        };
      })
      // fetchNewProducts
      .addCase(fetchNewProducts.pending, (state) => {
        state.newProducts = {
          data: [],
          isLoading: true,
          error: undefined,
        };
      })
      .addCase(fetchNewProducts.fulfilled, (state, action) => {
        state.newProducts = {
          data: action.payload,
          isLoading: false,
          error: undefined,
        };
      })
      .addCase(fetchNewProducts.rejected, (state, action) => {
        state.newProducts = {
          data: [],
          isLoading: false,
          error: action.error.message,
        };
      })
      // getProductByID
      .addCase(getProductByID.pending, (state) => {
        state.currentProduct = {
          data: undefined,
          isLoading: true,
          error: undefined,
        };
      })
      .addCase(getProductByID.fulfilled, (state, action) => {
        state.currentProduct = {
          data: action.payload,
          isLoading: false,
          error: undefined,
        };
      })
      .addCase(getProductByID.rejected, (state, action) => {
        state.currentProduct = {
          data: undefined,
          isLoading: false,
          error: action.error.message,
        };
      })
      // createProduct
      .addCase(createProduct.fulfilled, (state, action) => {
        state.allProducts.data = action.payload;
      })
      // deleteProduct
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.allProducts.data = action.payload;
      });
  },
});

export const productReducer = productSlice.reducer;
