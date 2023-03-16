export interface Product {
  _id: string,
  title: string,
  description: string,
  price: number,
  imageUrl: string | undefined
}

export interface ProductSliceState {
  allProducts: Product[],
  currentProduct: Product | undefined
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
  image: File | HTMLImageElement | HTMLElement
}

export interface CreateProductProps {
  newProduct: NewProductData,
  token: string
}