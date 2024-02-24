import { useTheme } from '@mui/material/styles';
import styled from '@mui/material/styles/styled';
import { Box, Grid, Toolbar, Typography, useMediaQuery } from '@mui/material';

import { Product } from '../../common/types/productTypes';
import ProductCard from './StoreCard';
import ProductCardSkeleton from './StoreCardSkeleton';

const styles = {
  root: {
    flexGrow: 1,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0px',
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
  },
  media: {
    height: 0,
    width: '100%',
    paddingTop: '100%', // 1:1 aspect ratio
  },
  heading: {
    margin: '20px',
  },
  headingText: {
    fontWeight: 700,
    opacity: '80%',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 700,
    lineHeight: 1.2,
    margin: '8px 0 0',
    whiteSpace: 'nowrap',
  },
  price: {
    fontSize: '0.9rem',
    fontWeight: 500,
    lineHeight: 1.2,
    margin: '12px 0 16px',
  },
};

const ProductListWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    margin: '0 0px',
  },
  [theme.breakpoints.up('md')]: {
    margin: '0 172px',
  },
}));

interface StoreListProps {
  products: Product[];
  isLoading: boolean;
}

const StoreList = ({ products, isLoading }: StoreListProps) => {
  const theme = useTheme();
  const isDownSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isDownMedium = useMediaQuery(theme.breakpoints.down('md'));

  const productsAmount = products.length;

  // Create a new ProductCard component for each product in the list
  const productCards = products.map((product) => (
    <Grid item xs={6} sm={6} md={4} key={product._id}>
      <ProductCard product={product} styles={styles} />
    </Grid>
  ));

  // When the page is loading, render the skeleton grid instead
  const skeletonCards = [...Array(10)].map((_, index) => (
    <Grid item xs={6} sm={6} md={4} key={index} sx={{ flexGrow: 1 }}>
      <ProductCardSkeleton styles={styles} />
    </Grid>
  ));

  return (
    <ProductListWrapper style={styles.root}>
      <Toolbar sx={isDownSmall ? { height: '108px' } : { height: '116px' }} />
      <Box sx={styles.heading}>
        <Typography variant='h5' sx={styles.headingText}>
          {isLoading ? 'X' : productsAmount}{' '}
          {productsAmount == 1 ? 'result' : 'results'}
        </Typography>
      </Box>
      <Grid container columnSpacing={isDownMedium ? 1 : 2} rowSpacing={2}>
        {isLoading ? skeletonCards : productCards}
      </Grid>
    </ProductListWrapper>
  );
};

export default StoreList;
