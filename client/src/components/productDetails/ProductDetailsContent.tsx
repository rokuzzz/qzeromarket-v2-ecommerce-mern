import { Box, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from 'react-toastify';

import { Product } from '../../types/products';
import { useAppDispatch } from '../../hooks/common/appHooks';
import { modifyCart } from '../../redux/slices/cartSlice';
import useCartQuantity from '../../hooks/cart/useCartQuantity';
import useUserShoppingCart from '../../hooks/cart/useUserShoppingCart';
import { modifyFavorites } from '../../redux/slices/favoritesSlice';
import useFavoriteStatus from '../../hooks/favorites/useFavoriteStatus';
import useToken from '../../hooks/common/useToken';
import CartInteractionButtons from './CartInteractionButtons';

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

  const accessToken = useToken();

  const dispatch = useAppDispatch();
  const { cartItems } = useUserShoppingCart({ accessToken: accessToken });
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

  const { isInFavorites, setIsInFavorites } = useFavoriteStatus({ title });

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
        <CartInteractionButtons
          cartQuantity={cartQuantity}
          handleCartDecrease={handleCartDecrease}
          handleCartIncrease={handleCartIncrease}
          handleDeleteCart={handleDeleteCart}
          handleAddToCart={handleAddToCart}
        />
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
