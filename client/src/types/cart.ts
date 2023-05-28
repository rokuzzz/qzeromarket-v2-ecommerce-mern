export interface CartItemDetails {
  _id: string,
  title: string,
  description: string,
  price: number
}

export interface ProductInCart {
  _id: string,
  cartItemDetails: CartItemDetails,
  quantity: number
}

export interface Cart {
  _id: string,
  cartItems: ProductInCart[]
  totalPrice?: number
}

export interface CartSliceState {
  usersShoppingCart?: Cart
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