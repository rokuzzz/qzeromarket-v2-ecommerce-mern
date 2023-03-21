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
}

export interface CartSliceState {
  usersShoppingCart: Cart
  allCarts: Cart[]
}

export interface GetUsersShoppingCartProps {
  userId: string,
  token: string
}

export interface addToCartProps {
  title: string,
  quantity: number,
  token: string
}