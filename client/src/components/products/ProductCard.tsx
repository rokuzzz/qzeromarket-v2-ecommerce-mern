import { ClassNameMap, Theme, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import { Product } from '../../types/products';

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
  >;
}

const ProductCard = ({ product, useStyles }: SingleProductProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardActionArea}>
        <CardMedia
          className={classes.media}
          image={product.imageUrl}
          title={product.title}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            variant='subtitle1'
            component='h2'
            className={classes.title}
          >
            {product.title}
          </Typography>
          <Typography
            variant='subtitle2'
            component='h3'
            className={classes.price}
          >
            €{product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
