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