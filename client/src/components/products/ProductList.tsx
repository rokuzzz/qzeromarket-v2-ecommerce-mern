import { makeStyles } from '@mui/styles';
import { Grid, Theme, Toolbar, useMediaQuery, useTheme } from '@mui/material';

import { Product } from './../../types/products';
import ProductCard from './ProductCard';

// Define styles for the component
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      margin: '0 5px',
    },
    [theme.breakpoints.up('md')]: {
      margin: '0 48px',
    },
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    boxShadow: 'none',
  },
  link: {
    textDecoration: 'none',
    outline: 'none',
    color: 'inherit',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      color: 'inherit',
    },
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
    // fontSize: '1.125rem',
    lineHeight: 1.2,
    margin: theme.spacing(1, 0, 0.5),
    whiteSpace: 'nowrap',
    // textTransform: 'uppercase',
  },
  price: {
    fontWeight: 700,
    fontSize: '1.1rem',
    lineHeight: 1.2,
    opacity: '75%',
    margin: theme.spacing(0.5, 0, 2),
  },
}));

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  const classes = useStyles();

  const theme = useTheme();
  const isDownSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // Create a new ProductCard component for each product in the list
  const productCards = products.map((product) => (
    <Grid item xs={6} sm={6} md={4} key={product._id}>
      <ProductCard product={product} useStyles={useStyles} />
    </Grid>
  ));

  return (
    <div className={classes.root}>
      <Toolbar sx={isDownSmall ? { height: '112px' } : { height: '128px' }} />
      <Grid container spacing={2}>
        {productCards}
      </Grid>
    </div>
  );
};

export default ProductList;
