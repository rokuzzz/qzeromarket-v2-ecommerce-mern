import { makeStyles } from '@mui/styles';
import { Grid, Theme, Toolbar, Typography } from '@mui/material';

import { Product } from './../../types/products';
import ProductCard from './ProductCard';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    margin: '0 16px',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    boxShadow: 'none',
  },
  cardActionArea: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  cardContent: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  media: {
    height: 0,
    width: '100%',
    paddingTop: '100%', // 1:1 aspect ratio
  },
  title: {
    fontWeight: 600,
    fontSize: '1.125rem',
    lineHeight: 1.2,
    margin: theme.spacing(1, 0, 0.5),
    textTransform: 'capitalize',
  },
  price: {
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.2,
    margin: theme.spacing(0.5, 0, 1),
  },
}));

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  const classes = useStyles();

  const renderProducts = products.map((product) => (
    <Grid item xs={12} sm={6} md={4} key={product._id}>
      <ProductCard product={product} useStyles={useStyles} />
    </Grid>
  ));

  return (
    <div className={classes.root}>
      <Toolbar sx={{ height: '128px' }} />
      <Grid container spacing={2}>
        {renderProducts}
      </Grid>
    </div>
  );
};

export default ProductList;
