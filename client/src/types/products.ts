export interface Product {
  _id: string,
  title: string,
  description: string,
  price: number,
  imageUrl: string | undefined
}

export interface ProductSliceState {
  allProducts: {
    data: Product[],
    loading: boolean, 
    error: string | null
  },
  currentProduct: {
    data: Product | undefined, 
    loading: boolean, 
    error: string | null
  } 
}

export interface QueryParams {
  sort?: string,
  order?: string,
  page?: string,
  limit?: string,
  categories?: string
}

export interface NewProductData {
  title: string,
  description: string,
  price: number,
  categories: string[],
  image: File | HTMLImageElement | HTMLElement | null
}

export interface CreateProductProps {
  newProduct: NewProductData,
  token: string
}

export interface UpdatedProduct {
  categories?: string[],
  title?: string,
  description?: string,
  price?: number
}

export interface UpdateProductParams {
  id: string,
  updatedProductData: UpdatedProduct,
  token: string
}

export interface DeleteProductProps {
  id: string,
  token: string
}