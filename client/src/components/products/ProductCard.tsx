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

interface SingleProductProps {
  product: Product;
  useStyles: (
    props?: any
  ) => ClassNameMap<
    | 'root'
    | 'card'
    | 'cardActionArea'
    | 'cardContent'
    | 'media'
    | 'title'
    | 'price'
    | 'link'
  >;
}

const ProductCard = ({ product, useStyles }: SingleProductProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Link className={classes.link} to={`/products/${product._id}`}>
        <CardActionArea className={classes.cardActionArea}>
          <CardMedia
            className={classes.media}
            image={product.imageUrl}
            title={product.title}
          />
          <CardContent className={classes.cardContent}>
            <Typography className={classes.title} variant='subtitle1'>
              {product.title}
            </Typography>
            <Typography
              className={classes.price}
              sx={{ margin: '0.5 0 2' }}
              variant='overline'
            >
              €{product.price}.99
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default ProductCard;
