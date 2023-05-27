import { Box, Button, Divider, List, Typography } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';

import { ProductInCart } from '../../types/cart';
import { useAppDispatch, useAppSelector } from '../../hooks/common/appHooks';
import { addToCart } from '../../redux/slices/cartSlice';
import CartItem from './CartItem';

interface CartContentProps {
  products: ProductInCart[] | undefined;
  totalPrice: number | undefined;
}

const CartContent = ({
  products: cartItems,
  totalPrice: totalPrice,
}: CartContentProps) => {
  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();

  const { allProducts } = useAppSelector((state) => state.productReducer);

  const cartItemList = cartItems?.map((cartItem, index) => {
    const { cartItemDetails, quantity: itemQuantity } = cartItem;

    const accessToken = localStorage.getItem('access_token') || '';

    const handleCartDecrease = () => {
      dispatch(
        addToCart({
          title: cartItemDetails.title,
          quantity: itemQuantity - 1,
          token: accessToken,
        })
      );
    };

    const handleCartIncrease = () => {
      dispatch(
        addToCart({
          title: cartItemDetails.title,
          quantity: itemQuantity + 1,
          token: accessToken,
        })
      );
    };

    const handleDeleteCart = () => {
      dispatch(
        addToCart({
          title: cartItemDetails.title,
          quantity: 0,
          token: accessToken,
        })
      );
    };

    const imageUrl = allProducts.data.find(
      (product) => product._id === cartItemDetails._id
    )?.imageUrl;

    return (
      <CartItem
        index={index}
        products={cartItems}
        productId={cartItemDetails}
        quantity={itemQuantity}
        imageUrl={imageUrl}
        theme={theme}
        handleCartDecrease={handleCartDecrease}
        handleCartIncrease={handleCartIncrease}
        handleDeleteCart={handleDeleteCart}
      />
    );
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '88vh' }}>
      <List sx={{ flexGrow: 1, padding: 0 }}>{cartItemList}</List>
      <Divider sx={{ my: 2 }} />
      <Button
        variant='contained'
        size='large'
        sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography variant='button'>Checkout</Typography>
        <Typography variant='h6'>€{totalPrice}.00</Typography>
      </Button>
    </Box>
  );
};

export default CartContent;
