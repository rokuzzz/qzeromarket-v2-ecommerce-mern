import { Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';

import { Product } from '../../types/products';
import { useAppDispatch } from '../../hooks/common/appHooks';
import { modifyCart } from '../../redux/slices/cartSlice';
import useCartQuantity from '../../hooks/cart/useCartQuantity';
import useUserShoppingCart from '../../hooks/cart/useUserShoppingCart';
import { modifyFavorites } from '../../redux/slices/favoritesSlice';
import useFavoriteStatus from '../../hooks/favorites/useFavoriteStatus';
import useToken from '../../hooks/common/useToken';
import CartInteractionButtons from './interaction/CartInteractionButtons';
import ModifyFavoritesButton from './interaction/ModifyFavoritesButton';
import { ButtonsWrapper } from '../../styles/detailsSection';

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
      <Box sx={styles.productInfoWrapper}>
        <Typography sx={styles.title} variant='h5' gutterBottom>
          {title}
        </Typography>
        <Typography sx={styles.price} variant='overline' gutterBottom>
          €{price}.00
        </Typography>
        <Typography sx={styles.description} variant='body1' gutterBottom>
          {description}
        </Typography>
      </Box>
      <ButtonsWrapper>
        <CartInteractionButtons
          cartQuantity={cartQuantity}
          handleCartDecrease={handleCartDecrease}
          handleCartIncrease={handleCartIncrease}
          handleDeleteCart={handleDeleteCart}
          handleAddToCart={handleAddToCart}
        />
        <ModifyFavoritesButton
          handleModifyFavorites={handleModifyFavorites}
          isInFavorites={isInFavorites}
        />
      </ButtonsWrapper>
    </Box>
  );
};

export default ProductDetailsContent;
