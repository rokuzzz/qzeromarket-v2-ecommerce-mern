import { useEffect, useState } from 'react';
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
import { fetchAllProducts } from '../../redux/slices/productSlice';
import { addToCart, countTotalPrice } from '../../redux/slices/cartSlice';

interface CartContentProps {
  products: ProductInCart[] | undefined;
  totalPrice: number | undefined;
}

const CartContent = ({ products, totalPrice }: CartContentProps) => {
  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();

  dispatch(countTotalPrice());

  const productsInCart = products?.map((product, index) => (
    <ListItem
      key={product.productId._id}
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
              €{product.productId.price * product.quantity}.00
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
                disabled={product.quantity <= 1 ? true : false}
                onClick={() =>
                  dispatch(
                    addToCart({
                      title: product.productId.title,
                      quantity: product.quantity - 1,
                      token: localStorage.getItem('access_token') || '',
                    })
                  )
                }
              >
                -
              </Button>
              <Button>{product.quantity}</Button>
              <Button
                onClick={() =>
                  dispatch(
                    addToCart({
                      title: product.productId.title,
                      quantity: product.quantity + 1,
                      token: localStorage.getItem('access_token') || '',
                    })
                  )
                }
              >
                +
              </Button>
            </ButtonGroup>
          </>
        }
      />
      <ListItemAvatar sx={{ width: '100px', height: '100px' }}>
        {/* {data.find((p) => p._id == product.productId.id)?.imageUrl} */}
        {/* <Avatar
          alt={product.productId.title}
          src={data.find((p) => p._id === product.productId.id)?.imageUrl}
        /> */}
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
        <Typography variant='h6'>€{totalPrice}.00</Typography>
      </Button>
    </Box>
  );
};

export default CartContent;
