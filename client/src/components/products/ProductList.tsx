import { useTheme } from '@mui/material/styles';
import styled from '@mui/material/styles/styled';
import { Box, Grid, Toolbar, useMediaQuery } from '@mui/material';

import { Product } from './../../types/products';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

// Define styles for the component
const styles = {
  root: {
    flexGrow: 1,
    // [theme.breakpoints.down('md')]: {
    //   margin: '0 5px',
    // },
    // [theme.breakpoints.up('md')]: {
    //   margin: '0 48px',
    // },
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
  cardContent: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  media: {
    height: '100%',
    width: '100%',
    paddingTop: '100%', // 1:1 aspect ratio
  },
  title: {
    fontSize: '0.9rem',
    lineHeight: 1.2,
    margin: '8px 0 0',
    whiteSpace: 'nowrap',
  },
  price: {
    fontSize: '1rem',
    fontWeight: 900,
    lineHeight: 1.2,
    opacity: '80%',
    margin: '8px 0 8px',
  },
};

const ProductListWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    margin: '0 5px',
  },
  [theme.breakpoints.up('md')]: {
    margin: '0 48px',
  },
}));

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
}

const ProductList = ({ products, isLoading }: ProductListProps) => {
  const theme = useTheme();
  const isDownSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // Create a new ProductCard component for each product in the list
  const productCards = products.map((product) => (
    <Grid item xs={6} sm={6} md={4} key={product._id}>
      <ProductCard product={product} styles={styles} />
    </Grid>
  ));

  // If there are no products, render a grid of skeletons instead
  const skeletonCards = [...Array(10)].map((_, index) => (
    <Grid item xs={6} sm={6} md={4} key={index} sx={{ flexGrow: 1 }}>
      <ProductCardSkeleton styles={styles} />
    </Grid>
  ));

  return (
    <ProductListWrapper style={styles.root}>
      <Toolbar sx={isDownSmall ? { height: '112px' } : { height: '128px' }} />
      <Grid container spacing={2}>
        {isLoading ? skeletonCards : productCards}
      </Grid>
    </ProductListWrapper>
  );
};

export default ProductList;
