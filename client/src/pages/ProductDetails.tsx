import { Box, Grid, Toolbar } from '@mui/material';
import styled from '@mui/material/styles/styled';

import Header from '../components/navigation/Header';
import ProductDetailsImage from '../components/products/ProductDetailsImage';
import ProductDetailsContent from '../components/products/ProductDetailsContent';
import ProductDetailsSkeleton from '../components/products/ProductDetailsSkeleton';
import useProductDetails from '../hooks/useProductDetails';

const styles = {
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  imageWrapper: {
    height: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  contentWrapper: {
    height: '100%',
    padding: '16px 16px 0',
  },
  title: {
    fontWeight: 700,
    marginBottom: '40px',
  },
  description: {
    marginBottom: '24px',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: 500,
    marginBottom: '80px',
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export const ProductDetailsWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    margin: '0px',
    padding: '0px',
  },
  [theme.breakpoints.up('lg')]: {
    margin: '16px 0px',
    padding: '0 48px',
  },
  margin: '16px 0px',
  padding: '0 16px',
}));

const ProductDetails = () => {
  const { data, isLoading } = useProductDetails();

  return (
    <>
      <Header />
      <Toolbar sx={{ height: '60px' }} />
      {isLoading ? (
        <ProductDetailsSkeleton styles={styles} />
      ) : (
        <ProductDetailsWrapper>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ProductDetailsImage styles={styles} data={data} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ProductDetailsContent styles={styles} data={data} />
            </Grid>
          </Grid>
        </ProductDetailsWrapper>
      )}
    </>
  );
};

export default ProductDetails;
