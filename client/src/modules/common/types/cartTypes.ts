export interface CartItemDetails {
  _id: string;
  title: string;
  description: string;
  price: number;
}

export interface ProductInCart {
  _id: string;
  cartItemDetails: CartItemDetails;
  quantity: number;
}

export interface Cart {
  _id: string;
  cartItems: ProductInCart[];
  totalPrice?: number;
}
