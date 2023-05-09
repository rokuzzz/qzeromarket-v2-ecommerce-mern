import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';

import { ProductInCart } from '../../types/cart';
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';
import { addToCart, countTotalPrice } from '../../redux/slices/cartSlice';

interface CartContentProps {
  products: ProductInCart[] | undefined;
  totalPrice: number | undefined;
}

const CartContent = ({ products, totalPrice }: CartContentProps) => {
  const theme: Theme = useTheme();

  const dispatch = useAppDispatch();

  const { allProducts } = useAppSelector((state) => state.productReducer);

  const productList = products?.map((product, index) => {
    const { productId, quantity } = product;
    const { _id, title, price } = productId;

    const handleCartDecrease = () => {
      dispatch(
        addToCart({
          title: title,
          quantity: quantity - 1,
          token: localStorage.getItem('access_token') || '',
        })
      );
    };

    const handleCartIncrease = () => {
      dispatch(
        addToCart({
          title: title,
          quantity: quantity + 1,
          token: localStorage.getItem('access_token') || '',
        })
      );
    };

    const imageUrl = allProducts.data.find((p) => p._id === _id)?.imageUrl;

    return (
      <ListItem key={_id} divider={index !== products.length - 1}>
        <ListItemText
          primary={
            <Typography
              variant='h6'
              textTransform={'uppercase'}
              sx={{ fontWeight: 700, lineHeight: 1 }}
            >
              {title}
            </Typography>
          }
          secondary={
            <>
              <Typography
                variant='h6'
                color={theme.palette.common.black}
                sx={{ fontWeight: 700, mb: 1 }}
              >
                €{price * quantity}.00
              </Typography>
              <Typography
                variant='subtitle2'
                color={theme.palette.common.black}
                sx={{ fontWeight: 700 }}
              >
                Quantity
              </Typography>
              <ButtonGroup variant='outlined' size='large' sx={{ mt: 1 }}>
                <Button
                  disabled={quantity <= 1 ? true : false}
                  onClick={handleCartDecrease}
                >
                  -
                </Button>
                <Button>{quantity}</Button>
                <Button
                  disabled={quantity >= 6 ? true : false}
                  onClick={handleCartIncrease}
                >
                  +
                </Button>
              </ButtonGroup>
            </>
          }
        />
        <ListItemAvatar sx={{ width: '100px', height: '100px' }}>
          <Avatar
            alt={productId.title}
            src={imageUrl}
            variant='rounded'
            sx={{ width: '100%', height: '100%' }}
          />
        </ListItemAvatar>
      </ListItem>
    );
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '88vh' }}>
      <List sx={{ flexGrow: 1, padding: 0 }}>{productList}</List>
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
