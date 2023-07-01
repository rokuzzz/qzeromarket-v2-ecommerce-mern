import { Box } from '@mui/material';

import { Product } from '../../types/products';
import { ImageWrapper } from '../../pages/ProductDetails';

interface ProductDetailsImageProps {
  styles: any;
  data?: Product;
}

const ProductDetailsImage = ({ styles, data }: ProductDetailsImageProps) => {
  const { imageUrl, title } = data || {};

  return (
    <ImageWrapper>
      <img style={styles.image} src={imageUrl} alt={title}></img>
    </ImageWrapper>
  );
};

export default ProductDetailsImage;
