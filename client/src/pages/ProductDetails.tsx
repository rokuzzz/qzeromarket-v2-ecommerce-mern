import { makeStyles } from '@mui/styles';
import {
  Theme,
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Toolbar,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/appHooks';
import { getProductByID } from '../redux/slices/productSlice';
import Header from '../components/navigation/Header';

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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
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
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { productId } = useParams();
  useEffect(() => {
    dispatch(getProductByID(productId));
  }, [productId]);

  const { currentProduct } = useAppSelector((state) => state.productReducer);
  return (
    <>
      <Header />
      <Toolbar />
      <Box className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box className={classes.imageWrapper}>
              <img
                className={classes.image}
                src={currentProduct?.imageUrl}
                alt={currentProduct?.title}
              ></img>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className={classes.contentWrapper}>
              <Box>
                <Typography className={classes.title} variant='h3' gutterBottom>
                  {currentProduct?.title}
                </Typography>
                <Typography className={classes.description} variant='body1' gutterBottom>
                  {currentProduct?.description}
                </Typography>
                <Typography className={classes.price} variant='h5' gutterBottom>
                  Product price: €{currentProduct?.price}.99
                </Typography>
              </Box>
              <Box className={classes.buttonsWrapper}>
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  fullWidth
                >
                  Add to Cart
                </Button>
                <Button
                  variant='outlined'
                  color='primary'
                  size='large'
                  fullWidth
                >
                  Add to Favorites
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductDetails;
