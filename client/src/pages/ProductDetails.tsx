import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Skeleton, Theme, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Header from '../components/navigation/Header';
import ProductDetailsImage from '../components/products/ProductDetailsImage';
import ProductDetailsContent from '../components/products/ProductDetailsContent';
import { useAppDispatch, useAppSelector } from '../hooks/appHooks';
import { getProductByID } from '../redux/slices/productSlice';

// Define the styles for the components using the MUI `makeStyles` hook
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2),
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
    padding: theme.spacing(2, 2, 0),
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(5),
  },
  description: {
    marginBottom: theme.spacing(3),
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: 500,
    marginBottom: theme.spacing(10),
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > button:first-of-type': {
      marginBottom: theme.spacing(1),
    },
  },
}));

const ProductDetails = () => {
  // Get the styles and dispatch function from the `useStyles` and `useAppDispatch` hooks
  const classes = useStyles();
  const dispatch = useAppDispatch();

  // Get the `productId` from the URL params using the `useParams` hook
  const { productId } = useParams();
  // Fetch the product data from the server when the productId changes using the getProductByID action from the productSlice via the app dispatch hook
  useEffect(() => {
    dispatch(getProductByID(productId));
  }, [productId]);

  // Get the `data` from the `currentProduct` state slice using the `useAppSelector` hook
  const { data, isLoading } = useAppSelector(
    (state) => state.productReducer.currentProduct
  );

  const productDetails = (
    <>
      <Grid item xs={12} md={6}>
        <ProductDetailsImage useStyles={useStyles} data={data} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ProductDetailsContent useStyles={useStyles} data={data} />
      </Grid>
    </>
  );

  const productDetailsSkeleton = (
    <Grid item>
      <Skeleton variant='rectangular' animation='wave' />
    </Grid>
  );

  return (
    <>
      <Header />
      <Toolbar />
      <Box className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ProductDetailsImage useStyles={useStyles} data={data} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProductDetailsContent useStyles={useStyles} data={data} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductDetails;
