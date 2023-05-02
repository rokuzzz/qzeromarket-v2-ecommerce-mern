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

interface CartContentProps {
  products: ProductInCart[];
  totalPrice: number | undefined;
}

const CartContent = ({ products, totalPrice }: CartContentProps) => {
  const theme: Theme = useTheme();

  const productsInCart = products.map((product, index) => (
    <ListItem
      key={product.productId.id}
      divider={index !== products.length - 1}
    >
      <ListItemText
        primary={
          <Typography
            variant='h6'
            textTransform={'uppercase'}
            sx={{ fontWeight: 700, lineHeight: 1 }}
          >
            {product.productId.title}
          </Typography>
        }
        secondary={
          <>
            <Typography
              variant='h6'
              color={theme.palette.common.black}
              sx={{ fontWeight: 700, mb: 1 }}
            >
              €{product.productId.price}.00
            </Typography>
            <Typography
              variant='subtitle2'
              color={theme.palette.common.black}
              sx={{ fontWeight: 700 }}
            >
              Quantity
            </Typography>
            <ButtonGroup variant='outlined' size='large' sx={{ mt: 1 }}>
              <Button>-</Button>
              <Button>{product.quantity}</Button>
              <Button>+</Button>
            </ButtonGroup>
          </>
        }
      />
      <ListItemAvatar>
        {/* <Avatar alt={product.productId.title} src={product.productId} /> */}
      </ListItemAvatar>
    </ListItem>
  ));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '88vh' }}>
      <List sx={{ flexGrow: 1, padding: 0 }}>{productsInCart}</List>
      <Divider sx={{ my: 2 }} />
      <Button
        variant='contained'
        size='large'
        sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography variant='button'>Checkout</Typography>
        <Typography variant='h6'>€{totalPrice}</Typography>
      </Button>
    </Box>
  );
};

export default CartContent;
