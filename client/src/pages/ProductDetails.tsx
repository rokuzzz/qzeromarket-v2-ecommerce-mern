import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Skeleton, Theme, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Header from '../components/navigation/Header';
import ProductDetailsImage from '../components/products/ProductDetailsImage';
import ProductDetailsContent from '../components/products/ProductDetailsContent';
import { useAppDispatch, useAppSelector } from '../hooks/appHooks';
import { getProductByID } from '../redux/slices/productSlice';
import ProductDetailsSkeleton from '../components/products/ProductDetailsSkeleton';

const styles = {
  root: {
    margin: '16px',
    height: '100%',
  },
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
    '& > *:first-of-type': {
      marginBottom: '8px',
    },
  },
};

const ProductDetails = () => {
  const dispatch = useAppDispatch();

  const { productId } = useParams();
  useEffect(() => {
    dispatch(getProductByID(productId));
  }, [productId]);

  const { data, isLoading } = useAppSelector(
    (state) => state.productReducer.currentProduct
  );

  return (
    <>
      <Header />
      <Toolbar />
      {isLoading ? (
        <ProductDetailsSkeleton styles={styles} />
      ) : (
        <Box sx={styles.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ProductDetailsImage styles={styles} data={data} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ProductDetailsContent styles={styles} data={data} />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ProductDetails;
