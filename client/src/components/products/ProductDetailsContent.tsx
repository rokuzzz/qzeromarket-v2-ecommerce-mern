import { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';

import { Product } from '../../types/products';
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';
import { addToCart, getUsersShoppingCart } from '../../redux/slices/cartSlice';

interface ProductDetailsContentProps {
  styles: any;
  data?: Product;
}

const ProductDetailsContent = ({
  styles,
  data,
}: ProductDetailsContentProps) => {
  const { _id, title, description, price } = data || {
    _id: '',
    title: '',
    description: '',
    price: 0,
  };
  const accessToken = localStorage.getItem('access_token') || '';

  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector((state) => state.userReducer);

  const { usersShoppingCart } = useAppSelector((state) => state.cartReducer);
  const { products } = usersShoppingCart || { products: undefined };

  const [cartQuantity, setCartQuantity] = useState<number>(
    products?.find((product) => product.productId._id === _id)?.quantity || 0
  );

  useEffect(() => {
    dispatch(
      getUsersShoppingCart({
        userId: currentUser.data!._id,
        token: accessToken,
      })
    );
  }, []);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        title: title,
        quantity: 1,
        token: accessToken,
      })
    );
    setCartQuantity(1);
  };

  const handleCartIncrease = () => {
    setCartQuantity(cartQuantity + 1);
    dispatch(
      addToCart({
        title: title,
        quantity: cartQuantity + 1,
        token: accessToken,
      })
    );
  };

  const handleCartDecrease = () => {
    if (cartQuantity > 1) {
      setCartQuantity(cartQuantity - 1);
      dispatch(
        addToCart({
          title: title,
          quantity: cartQuantity - 1,
          token: accessToken,
        })
      );
    }
  };

  return (
    <Box sx={styles.contentWrapper}>
      <Box>
        <Typography sx={styles.title} variant='h3' gutterBottom>
          {title}
        </Typography>
        <Typography sx={styles.description} variant='body1' gutterBottom>
          {description}
        </Typography>
        <Typography sx={styles.price} variant='h5' gutterBottom>
          Product price: €{price}.00
        </Typography>
      </Box>
      <Box sx={styles.buttonsWrapper}>
        {products && products.find((p) => p.productId._id == _id) ? (
          <ButtonGroup
            variant='contained'
            size='large'
            color='primary'
            fullWidth
          >
            <Button
              disabled={cartQuantity == 1 ? true : false}
              onClick={handleCartDecrease}
            >
              -
            </Button>
            <Button disableTouchRipple>
              {
                cartQuantity
              }
            </Button>
            <Button onClick={handleCartIncrease}>+</Button>
          </ButtonGroup>
        ) : (
          <Button
            onClick={handleAddToCart}
            variant='contained'
            color='primary'
            size='large'
            fullWidth
          >
            Add to Cart
          </Button>
        )}
        <Button variant='outlined' color='primary' size='large' fullWidth>
          Add to Favorites
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetailsContent;
