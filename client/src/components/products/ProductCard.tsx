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
  isDownSmall: boolean;
}

const ProductCard = ({
  product,
  useStyles,
  isDownSmall,
}: SingleProductProps) => {
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
    </Card>
  );
};

export default ProductCard;
