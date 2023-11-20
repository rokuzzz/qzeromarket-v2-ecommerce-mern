import { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/common/appHooks';
import {
  fetchBestsellers,
  fetchFilteredProducts,
} from '../../redux/slices/productSlice';
import {
  FeaturedItemsCarouselWrapper,
  StyledFeaturedCarousel,
} from '../../styles/favorites';
import FeaturedCard from './FeaturedCard';

const FeaturedItemsCarousel = () => {
  const dispatch = useAppDispatch();
  const { bestsellers } = useAppSelector((state) => state.productReducer);

  const { data, isLoading } = bestsellers;

  useEffect(() => {
    dispatch(fetchFilteredProducts({ limit: '&limit=1000' }));
    dispatch(fetchBestsellers());
  }, [dispatch]);

  return (
    <FeaturedItemsCarouselWrapper>
      <Typography
        variant='h5'
        sx={{
          fontWeight: 700,
          opacity: '80%',
          marginLeft: { xs: '8px', sm: '16px', md: '48px' },
        }}
      >
        Find Your Next Favorite
      </Typography>
      <StyledFeaturedCarousel>
        {isLoading ? (
          <Box sx={{ margin: '124px auto' }}>
            <CircularProgress color='secondary' />
          </Box>
        ) : (
          <>
            {data.map((item, index) => (
              <FeaturedCard data={data} item={item} index={index} />
            ))}
          </>
        )}
      </StyledFeaturedCarousel>
    </FeaturedItemsCarouselWrapper>
  );
};

export default FeaturedItemsCarousel;
