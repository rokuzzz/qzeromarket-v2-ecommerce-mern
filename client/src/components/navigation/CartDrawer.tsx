import { Drawer, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';
import { useEffect } from 'react';

import { getUsersShoppingCart } from '../../redux/slices/cartSlice';

const CartDrawer = () => {
  const { data } = useAppSelector((state) => state.userReducer.currentUser);

  const { usersShoppingCart } = useAppSelector((state) => state.cartReducer);
  const { id, products, totalPrice } = usersShoppingCart;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getUsersShoppingCart({
        userId: data!._id,
        token: localStorage.getItem('access_token'),
      })
    );
  }, []);

  return (
    <Drawer open={true} anchor='right'>
      {products.map((product) => (
        <Typography>{product.productId.title}</Typography>
      ))}
      <Typography>{totalPrice}</Typography>
    </Drawer>
  );
};

export default CartDrawer;
