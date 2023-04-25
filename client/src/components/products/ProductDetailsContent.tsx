import { ClassNameMap } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

import { Product } from '../../types/products';

interface ProductDetailsContentProps {
  useStyles: (
    props?: any
  ) => ClassNameMap<
    | 'title'
    | 'image'
    | 'root'
    | 'imageWrapper'
    | 'contentWrapper'
    | 'description'
    | 'price'
    | 'buttonsWrapper'
  >;
  data?: Product;
}

const ProductDetailsContent = ({
  useStyles,
  data,
}: ProductDetailsContentProps) => {
  const classes = useStyles();

  const {title, description, price} = data || {}

  return (
    <Box className={classes.contentWrapper}>
      <Box>
        <Typography className={classes.title} variant='h3' gutterBottom>
          {title}
        </Typography>
        <Typography
          className={classes.description}
          variant='body1'
          gutterBottom
        >
          {description}
        </Typography>
        <Typography className={classes.price} variant='h5' gutterBottom>
          Product price: €{price}.99
        </Typography>
      </Box>
      <Box className={classes.buttonsWrapper}>
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
