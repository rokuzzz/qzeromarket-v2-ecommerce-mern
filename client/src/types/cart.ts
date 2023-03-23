export interface ProductDetails {
  id: string,
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
  usersShoppingCart: Cart
}

export interface GetUsersShoppingCartProps {
  userId: string,
  token: string
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