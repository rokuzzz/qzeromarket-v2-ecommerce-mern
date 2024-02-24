import { Cart } from 'src/modules/common/types/cartTypes';

export interface CartSliceState {
  usersShoppingCart?: Cart;
}

export interface GetUsersShoppingCartProps {
  userId: string;
  token: string | null;
}

export interface AddToCartProps {
  title: string;
  quantity: number;
  token: string;
}

export interface DeleteCartProps {
  id: string;
  token: string;
}
