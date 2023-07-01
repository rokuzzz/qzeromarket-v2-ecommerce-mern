import { Box, Grid, Toolbar } from '@mui/material';
import styled from '@mui/material/styles/styled';

import Header from '../components/navigation/Header';
import ProductDetailsImage from '../components/productDetails/ProductDetailsImage';
import ProductDetailsContent from '../components/productDetails/ProductDetailsContent';
import ProductDetailsSkeleton from '../components/productDetails/ProductDetailsSkeleton';
import useProductDetails from '../hooks/useProductDetails';
import Footer from '../components/navigation/Footer';

const styles = {
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  imageWrapper: {
    height: '100%',
    padding: '0 16px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  contentWrapper: {
    position: 'relative', // Add this
    height: '100%',
    padding: '0 16px',
  },
  title: {
    margin: '8px 0 0',
    fontSize: '1.6rem',
    fontWeight: 500,
  },
  description: {
    margin: '24px 0 0',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.2,
  },
  buttonsWrapper: {
    position: 'absolute',
    bottom: '8px',
    left: '16px',
    right: '32px',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export const ProductDetailsWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    margin: '0 0 16px',
    padding: '0px',
  },
  [theme.breakpoints.up('lg')]: {
    margin: '50px 104px 50px 104px',
    padding: '0 48px',
  },
  margin: '52px 16px 52px',
  padding: '0 16px',
}));

export const ButtonsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '24px 0 0',
  [theme.breakpoints.up('md')]: {
    position: 'absolute',
    bottom: '8px',
    left: '16px',
    right: '32px',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0px',
  },
}));

export const ImageWrapper = styled(Box)(({ theme }) => ({
  height: '100%',
  padding: '0 16px',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '0px',
  },
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
            <Grid item xs={12} md={7}>
              <ProductDetailsImage styles={styles} data={data} />
            </Grid>
            <Grid item xs={12} md={5}>
              <ProductDetailsContent styles={styles} data={data} />
            </Grid>
          </Grid>
        </ProductDetailsWrapper>
      )}
      <Footer />
    </>
  );
};

export default ProductDetails;
