import { ClassNameMap } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

import { Product } from '../../types/products';
import { useAppDispatch } from '../../hooks/appHooks';
import { addToCart } from '../../redux/slices/cartSlice';

interface ProductDetailsContentProps {
  styles: any;
  data?: Product;
}

const ProductDetailsContent = ({
  styles,
  data,
}: ProductDetailsContentProps) => {
  const dispatch = useAppDispatch();

  const { title, description, price } = data || {};

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
        <Button
          onClick={() =>
            dispatch(
              addToCart({
                title: title || '',
                quantity: 1,
                token: localStorage.getItem('access_token') || '',
              })
            )
          }
          variant='contained'
          color='primary'
          size='large'
          fullWidth
        >
          Add to Cart
        </Button>
        <Button variant='outlined' color='primary' size='large' fullWidth>
          Add to Favorites
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetailsContent;
