import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../common/hooks/appHooks';
import { getUsersShoppingCart } from '../redux/cartSlice';

interface useUserShoppingCartProps {
  accessToken: string;
}

const useUserShoppingCart = ({ accessToken }: useUserShoppingCartProps) => {
  const dispatch = useAppDispatch();

  const { usersShoppingCart } = useAppSelector((state) => state.cartReducer);
  const { cartItems, totalPrice } = usersShoppingCart || {
    cartItems: undefined,
  };

  const { data } = useAppSelector((state) => state.authReducer.loggedInUser);

  useEffect(() => {
    dispatch(
      getUsersShoppingCart({
        userId: data!._id,
        token: accessToken,
      })
    );
  }, [dispatch, data, accessToken]);

  return { cartItems, totalPrice };
};

export default useUserShoppingCart;
