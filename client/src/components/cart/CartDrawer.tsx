import { useEffect } from 'react';
import { Box, Divider, Drawer } from '@mui/material';
import { styled } from '@mui/system';

import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';
import {
  countTotalPrice,
  getUsersShoppingCart,
} from '../../redux/slices/cartSlice';
import CartContent from './CartContent';
import CartHeading from './CartHeading';

const CartWrapper = styled(Box)(({ theme }) => ({
  padding: '12px 32px 8px 32px',
}));

interface CartDrawerProps {
  cartIsOpen: boolean;
  setCartIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartDrawer = ({ cartIsOpen, setCartIsOpen }: CartDrawerProps) => {
  const { loggedInUser } = useAppSelector((state) => state.userReducer);

  const dispatch = useAppDispatch();

  const { usersShoppingCart } = useAppSelector((state) => state.cartReducer);
  const { products, totalPrice } = usersShoppingCart ?? {};

  useEffect(() => {
    dispatch(
      getUsersShoppingCart({
        userId: loggedInUser.data!._id,
        token: localStorage.getItem('access_token'),
      })
    );
  }, []);

  dispatch(countTotalPrice());

  // Computes the total quantity of items in the shopping cart
  const getCartTotalQuantity = () => {
    let cartTotalQuantity = 0;
    if (products) {
      for (let i = 0; i < products?.length; i++) {
        cartTotalQuantity += products[i].quantity;
      }
    }
    return cartTotalQuantity;
  };

  return (
    <Drawer
      open={cartIsOpen}
      onClose={() => setCartIsOpen(false)}
      anchor='right'
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 600 },
          maxWidth: '100%',
          overflow: 'auto',
        },
      }}
    >
      <CartWrapper>
        <CartHeading
          products={products}
          cartTotalQuantity={getCartTotalQuantity()}
          setCartIsOpen={setCartIsOpen}
        />
        <Divider />
        <CartContent products={products} totalPrice={totalPrice} />
      </CartWrapper>
    </Drawer>
  );
};

export default CartDrawer;
