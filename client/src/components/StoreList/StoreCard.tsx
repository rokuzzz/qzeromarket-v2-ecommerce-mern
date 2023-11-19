import { Card, CardActionArea, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Product } from '../../types/products';
import {
  ProductDetailsCardContent,
  ProductPriceTypography,
  ProductTitleTypography,
} from '../../styles/products';

interface SingleProductProps {
  product: Product;
  styles: any;
}

const ProductCard = ({ product, styles }: SingleProductProps) => {
  return (
    <Card sx={styles.card}>
      <Link style={styles.link} to={`/products/${product._id}`}>
        <CardActionArea>
          <CardMedia
            sx={styles.media}
            image={product.imageUrl}
            title={product.title}
          />
          <ProductDetailsCardContent>
            <ProductTitleTypography variant='subtitle1'>
              {product.title}
            </ProductTitleTypography>
            <ProductPriceTypography variant='overline'>
              €{product.price}.00
            </ProductPriceTypography>
          </ProductDetailsCardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default ProductCard;
