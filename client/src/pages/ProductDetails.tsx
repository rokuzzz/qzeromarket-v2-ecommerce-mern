import {
  Grid,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import styled from '@mui/material/styles/styled';
import { useState } from 'react';

import Header from '../components/navigation/Header';
import ProductDetailsImage from '../components/productDetails/ProductDetailsImage';
import ProductDetailsContent from '../components/productDetails/ProductDetailsContent';
import ProductDetailsSkeleton from '../components/productDetails/ProductDetailsSkeleton';
import useProductDetails from '../hooks/useProductDetails';
import Footer from '../components/navigation/Footer';
import { ProductDetailsWrapper } from '../styles/productDetails';

const ProductDetails = () => {
  const { data, isLoading } = useProductDetails();

  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const [availableHeight, setAvailableHeight] = useState(0);

  const styles = {
    image: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
    contentWrapper: {
      position: 'relative',
      height: '100%',
      padding: '0 16px',
    },
    title: {
      margin: '8px 0 0',
      fontSize: '1.6rem',
      fontWeight: 500,
    },
    price: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    description: { margin: '16px 0 0' },
    productInfoWrapper: {
      maxHeight: isUpMd ? `${availableHeight}px` : 'auto',
      overflowY: isUpMd ? 'auto' : 'hidden',
      padding: '0 32px 0 0',
      '&::-webkit-scrollbar': {
        width: '10px',
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#888',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
      },
    },
  };

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
              <ProductDetailsImage
                styles={styles}
                data={data}
                setAvailableHeight={setAvailableHeight}
              />
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
