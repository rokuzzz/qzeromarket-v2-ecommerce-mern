import { Box, IconButton, Typography } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { ProductInCart } from '../../types/cart';

interface CartHeadingProps {
  cartItems: ProductInCart[] | undefined;
  cartTotalQuantity: number;
  setCartIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartHeading = ({
  cartItems,
  cartTotalQuantity,
  setCartIsOpen,
}: CartHeadingProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      {cartItems?.length === 0 ? (
        <ShoppingBagOutlinedIcon sx={{ width: '32px', height: '32px' }} />
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ShoppingBagIcon sx={{ width: '32px', height: '32px' }} />
          <Typography variant='h6' sx={{ marginLeft: '8px', fontWeight: 700 }}>
            {cartTotalQuantity} {cartTotalQuantity === 1 ? 'Item' : 'Items'}
          </Typography>
        </Box>
      )}
      <Box sx={{ flexGrow: 1 }} />
      <IconButton
        onClick={() => setCartIsOpen(false)}
        color='inherit'
        aria-aria-label='close'
      >
        <CloseIcon sx={{ width: '32px', height: '32px' }} />
      </IconButton>
    </Box>
  );
};

export default CartHeading;
