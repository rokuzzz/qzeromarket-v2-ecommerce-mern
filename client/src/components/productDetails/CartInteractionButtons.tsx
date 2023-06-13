import { Button, ButtonGroup, Grid } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface CartInteractionButtonsProps {
  cartQuantity: number;
  handleCartDecrease: () => void;
  handleCartIncrease: () => void;
  handleDeleteCart: () => void;
  handleAddToCart: () => void;
}

const CartInteractionButtons = ({
  cartQuantity,
  handleCartDecrease,
  handleCartIncrease,
  handleDeleteCart,
  handleAddToCart,
}: CartInteractionButtonsProps) => {
  return cartQuantity > 0 ? (
    <Grid container spacing={1} alignItems='center' sx={{ mb: 1 }}>
      <Grid item xs={8}>
        <ButtonGroup variant='contained' size='large' color='primary' fullWidth>
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
  );
};

export default CartInteractionButtons;
