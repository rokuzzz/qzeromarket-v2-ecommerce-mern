export interface Product {
  _id: string,
  title: string,
  description: string,
  price: number,
  imageUrl: string | undefined
}

export interface ProductSliceState {
  products: Product[]
}

export interface QueryParams {
  sort?: string,
  order?: string,
  page?: string,
  limit?: string,
  categories?: string
}