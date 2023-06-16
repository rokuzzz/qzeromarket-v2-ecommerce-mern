import { Box, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/common/appHooks';
import { useEffect } from 'react';
import { fetchAllProducts } from '../../redux/slices/productSlice';

const HorizontalRecommendationList = () => {
  const dispatch = useAppDispatch();
  const { allProducts } = useAppSelector((state) => state.productReducer);

  const { data, isLoading } = allProducts;

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        categories: '&categories=Bestsellers',
        limit: '&limit=100',
      })
    );
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        flexDirection: 'row',
        scrollbarWidth: 'none', // for Firefox
        '&::-webkit-scrollbar': {
          display: 'none', // for Chrome, Safari, and Opera
        },
      }}
    >
      <Grid container spacing={2} direction='row'>
        {data.map((item, index) => (
          <Grid item key={index} xs={4}>
            {item.title}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HorizontalRecommendationList;
