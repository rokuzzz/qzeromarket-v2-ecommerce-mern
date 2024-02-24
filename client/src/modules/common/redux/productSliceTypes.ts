import { Product } from 'src/modules/common/types/productTypes';

export interface ProductSliceState {
  allProducts: {
    data: Product[];
    isLoading: boolean;
    error: string | undefined;
  };
  bestsellers: {
    data: Product[];
    isLoading: boolean;
    error: string | undefined;
  };
  newProducts: {
    data: Product[];
    isLoading: boolean;
    error: string | undefined;
  };
  currentProduct: {
    data: Product | undefined;
    isLoading: boolean;
    error: string | undefined;
  };
}

export interface QueryParams {
  sort?: string;
  order?: string;
  page?: string;
  limit?: string;
  categories?: string;
}

export interface NewProductData {
  title: string;
  description: string;
  price: number;
  categories: string[];
  image: File | HTMLImageElement | HTMLElement | null;
}

export interface CreateProductProps {
  newProduct: NewProductData;
  token: string;
}

export interface UpdatedProduct {
  categories?: string[];
  title?: string;
  description?: string;
  price?: number;
}

export interface UpdateProductParams {
  id: string;
  updatedProductData: UpdatedProduct;
  token: string;
}

export interface DeleteProductProps {
  id: string;
  token: string;
}
