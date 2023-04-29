import { ClassNameMap } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

import { Product } from '../../types/products';

interface ProductDetailsContentProps {
  styles: any,
  data?: Product;
}

const ProductDetailsContent = ({
  styles,
  data,
}: ProductDetailsContentProps) => {
   const {title, description, price} = data || {}

  return (
    <Box sx={styles.contentWrapper}>
      <Box>
        <Typography sx={styles.title} variant='h3' gutterBottom>
          {title}
        </Typography>
        <Typography
          sx={styles.description}
          variant='body1'
          gutterBottom
        >
          {description}
        </Typography>
        <Typography sx={styles.price} variant='h5' gutterBottom>
          Product price: €{price}.99
        </Typography>
      </Box>
      <Box sx={styles.buttonsWrapper}>
        <Button variant='contained' color='primary' size='large' fullWidth>
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
