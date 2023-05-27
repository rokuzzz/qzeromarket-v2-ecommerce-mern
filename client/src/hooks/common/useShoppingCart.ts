import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './appHooks';
import { getUsersShoppingCart } from '../../redux/slices/cartSlice';

interface useShoppingCartProps {
  accessToken: string;
}

const useShoppingCart = ({ accessToken }: useShoppingCartProps) => {
  const dispatch = useAppDispatch();

  const { usersShoppingCart } = useAppSelector((state) => state.cartReducer);
  const { cartItems, totalPrice } = usersShoppingCart || {
    cartItems: undefined,
  };

  const { loggedInUser } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(
      getUsersShoppingCart({
        userId: loggedInUser.data!._id,
        token: accessToken,
      })
    );
  }, [dispatch, loggedInUser, accessToken]);

  return { cartItems, totalPrice, };
};

export default useShoppingCart;
