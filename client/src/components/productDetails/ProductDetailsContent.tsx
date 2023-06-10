import { Box, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from 'react-toastify';

import { Product } from '../../types/products';
import { useAppDispatch, useAppSelector } from '../../hooks/common/appHooks';
import { modifyCart } from '../../redux/slices/cartSlice';
import useCartQuantity from '../../hooks/common/useCartQuantity';
import useShoppingCart from '../../hooks/common/useShoppingCart';
import { useEffect, useState } from 'react';
import { modifyFavorites } from '../../redux/slices/favoritesSlice';

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
  const { cartItems } = useShoppingCart({ accessToken: accessToken });
  const { cartQuantity, setCartQuantity } = useCartQuantity({ _id, cartItems });

  const handleAddToCart = () => {
    dispatch(
      modifyCart({
        title: title,
        quantity: 1,
        token: accessToken,
      })
    );
    setCartQuantity(1);
    toast.success(`${title} added to cart!`, {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const handleDeleteCart = () => {
    setCartQuantity(0);
    dispatch(
      modifyCart({
        title: title,
        quantity: 0,
        token: accessToken,
      })
    );
    toast.error(`${title} removed from cart!`, {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  const handleCartIncrease = () => {
    setCartQuantity(cartQuantity + 1);
    dispatch(
      modifyCart({
        title: title,
        quantity: cartQuantity + 1,
        token: accessToken,
      })
    );
    toast.info(`${title} quantity increased!`, {
      position: 'bottom-right',
      autoClose: 1500,
    });
  };

  const handleCartDecrease = () => {
    if (cartQuantity > 1) {
      setCartQuantity(cartQuantity - 1);
      dispatch(
        modifyCart({
          title: title,
          quantity: cartQuantity - 1,
          token: accessToken,
        })
      );
      toast.info(`${title} quantity decreased!`, {
        position: 'bottom-right',
        autoClose: 1500,
      });
    }
  };

  const { usersFavorites } = useAppSelector((state) => state.favoritesReducer);

  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    if (
      usersFavorites?.data?.favoritesItems.find(
        (i) => i.itemInFavorites.title === title
      )
    ) {
      setIsInFavorites(true);
    } else {
      setIsInFavorites(false);
    }
  }, []);

  const handleModifyFavorites = () => {
    dispatch(modifyFavorites({ title: data?.title || '', token: accessToken }));
    setIsInFavorites(!isInFavorites);
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
        {cartQuantity > 0 ? (
          <Grid container spacing={1} alignItems='center' sx={{ mb: 1 }}>
            <Grid item xs={8}>
              <ButtonGroup
                variant='contained'
                size='large'
                color='primary'
                fullWidth
              >
                <Button
                  disabled={cartQuantity <= 1 ? true : false}
                  onClick={handleCartDecrease}
                >
                  -
                </Button>
                <Button disableTouchRipple>{cartQuantity}</Button>
                <Button onClick={handleCartIncrease}>+</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant='contained'
                color='error'
                size='large'
                fullWidth
                sx={{ height: '42.25px' }}
                onClick={handleDeleteCart}
              >
                <DeleteForeverIcon />
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Button
            onClick={handleAddToCart}
            variant='contained'
            color='primary'
            size='large'
            fullWidth
            sx={{ mb: 1 }}
          >
            Add to Cart
          </Button>
        )}
        <Button
          variant='outlined'
          color='primary'
          size='large'
          fullWidth
          onClick={handleModifyFavorites}
        >
          Add to Favorites
          <Box ml={1} display='flex' alignItems='center'>
            {isInFavorites ? (
              <FavoriteIcon fontSize='small' />
            ) : (
              <FavoriteBorderIcon fontSize='small' />
            )}
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetailsContent;
