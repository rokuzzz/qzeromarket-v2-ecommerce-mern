import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../common/appHooks';
import { getUsersShoppingCart } from '../../redux/slices/cartSlice';

interface useUserShoppingCartProps {
  accessToken: string;
}

const useUserShoppingCart = ({ accessToken }: useUserShoppingCartProps) => {
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

  return { cartItems, totalPrice };
};

export default useUserShoppingCart;
