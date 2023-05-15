import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { Product } from '../../types/products';
import { CartItemDetails, ProductInCart } from '../../types/cart';

interface CartItemProps {
  index: number;
  products: ProductInCart[];
  productId: CartItemDetails;
  quantity: number;
  imageUrl?: string;
  theme: Theme;
  handleCartDecrease: () => void;
  handleCartIncrease: () => void;
  handleDeleteCart: () => void;
}

const CartItem = ({
  index,
  products: cartItems,
  productId: cartItem,
  quantity: itemQuantity,
  imageUrl,
  theme,
  handleCartDecrease,
  handleCartIncrease,
  handleDeleteCart,
}: CartItemProps) => {
  const { _id, title, price } = cartItem;

  return (
    <ListItem key={_id} divider={index !== cartItems.length - 1}>
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
              €{price * itemQuantity}.00
            </Typography>
            <Typography
              variant='subtitle2'
              color={theme.palette.common.black}
              sx={{ fontWeight: 700 }}
            >
              Quantity
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'raw',
                alignItems: 'center',
                mt: 1,
              }}
            >
              <ButtonGroup variant='outlined' size='large' sx={{ mr: 1 }}>
                <Button
                  disabled={itemQuantity <= 1 ? true : false}
                  onClick={handleCartDecrease}
                >
                  -
                </Button>
                <Button>{itemQuantity}</Button>
                <Button
                  disabled={itemQuantity >= 6 ? true : false}
                  onClick={handleCartIncrease}
                >
                  +
                </Button>
              </ButtonGroup>
              <Button
                variant='outlined'
                color='error'
                size='large'
                sx={{ height: '42.25px' }}
                onClick={handleDeleteCart}
              >
                <DeleteForeverIcon />
              </Button>
            </Box>
          </>
        }
      />
      <ListItemAvatar sx={{ width: '100px', height: '100px' }}>
        <Avatar
          alt={cartItem.title}
          src={imageUrl}
          variant='rounded'
          sx={{ width: '100%', height: '100%' }}
        />
      </ListItemAvatar>
    </ListItem>
  );
};

export default CartItem;
