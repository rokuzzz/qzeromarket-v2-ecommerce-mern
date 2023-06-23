import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from '@mui/material';
import styled from '@mui/material/styles/styled';

import { Product } from '../../types/products';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductDetailsCardContent } from '../../styles/products';

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
            <Typography sx={styles.title} variant='subtitle1'>
              {product.title}
            </Typography>
            <Typography sx={styles.price} variant='overline'>
              €{product.price}.00
            </Typography>
          </ProductDetailsCardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default ProductCard;
