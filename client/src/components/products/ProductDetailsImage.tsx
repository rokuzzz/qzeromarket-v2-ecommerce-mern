import { ClassNameMap } from '@mui/material/styles';
import { Box } from '@mui/material';

import { Product } from '../../types/products';

interface ProductDetailsImageProps {
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

const ProductDetailsImage = ({ useStyles, data }: ProductDetailsImageProps) => {
  const classes = useStyles();

  const {imageUrl, title} = data || {}

  return (
    <Box className={classes.imageWrapper}>
      <img
        className={classes.image}
        src={imageUrl}
        alt={title}
      ></img>
    </Box>
  );
};

export default ProductDetailsImage;
