import { ClassNameMap } from '@mui/material/styles';
import { Box } from '@mui/material';

import { Product } from '../../types/products';

interface ProductDetailsImageProps {
  styles: any;
  data?: Product;
}

const ProductDetailsImage = ({ styles, data }: ProductDetailsImageProps) => {
  const { imageUrl, title } = data || {};

  return (
    <Box sx={styles.imageWrapper}>
      <img style={styles.image} src={imageUrl} alt={title}></img>
    </Box>
  );
};

export default ProductDetailsImage;
