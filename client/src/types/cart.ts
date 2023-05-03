export interface ProductDetails {
  _id: string,
  title: string,
  description: string,
  price: number
}

export interface ProductInCart {
  id: string,
  productId: ProductDetails,
  quantity: number
}

export interface Cart {
  id: string,
  products: ProductInCart[]
  totalPrice?: number
}

export interface CartSliceState {
  usersShoppingCart: Cart | undefined
}

export interface GetUsersShoppingCartProps {
  userId: string,
  token: string | null
}

export interface AddToCartProps {
  title: string,
  quantity: number,
  token: string
}

export interface DeleteCartProps {
  id: string,
  token: string
}