import { useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/common/appHooks';
import { fetchNewProducts } from '../../redux/slices/productSlice';
import { NewProductsListWrapper } from '../../styles/newProductsList';

const NewProductsList = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useAppSelector(
    (state) => state.productReducer
  ).newProducts;

  useEffect(() => {
    dispatch(fetchNewProducts());
  }, []);

  return (
    <NewProductsListWrapper>
      <Typography
        variant='h5'
        sx={{
          fontWeight: 700,
          opacity: '80%',
          margin: { xs: '16px 12px', sm: '16px 0' },
        }}
      >
        New Arrivals
      </Typography>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '41vh',
          }}
        >
          <CircularProgress color='secondary' />
        </Box>
      ) : (
        <Grid container spacing={1.5}>
          {data.slice(0, 9).map((item) => (
            <Grid item xs={6} sm={6} md={3} key={item._id}>
              <Card sx={{ borderRadius: '0px', boxShadow: 'none' }}>
                <CardMedia
                  component='img'
                  height='auto'
                  image={item.imageUrl}
                  alt={item.title}
                />
                <CardContent
                  sx={{ padding: { sm: '16px 0px 0px 12px', md: '16px 0px' } }}
                >
                  <Typography
                    variant='subtitle1'
                    component='div'
                    sx={{
                      whiteSpace: 'nowrap',
                      fontSize: '1rem',
                      lineHeight: 1.2,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant='body2' sx={{ fontSize: '0.75rem' }}>
                    price in eur: {item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </NewProductsListWrapper>
  );
};

export default NewProductsList;
