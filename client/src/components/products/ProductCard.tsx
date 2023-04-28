import { ClassNameMap } from '@mui/material/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import { Product } from '../../types/products';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
          <CardContent sx={styles.cardContent}>
            <Typography sx={styles.title} variant='subtitle1'>
              {product.title}
            </Typography>
            <Typography sx={styles.price} variant='overline'>
              €{product.price}.99
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default ProductCard;
