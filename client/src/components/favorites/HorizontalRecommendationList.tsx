import { useEffect } from 'react';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/common/appHooks';
import {
  fetchBestsellers,
  fetchFilteredProducts,
} from '../../redux/slices/productSlice';
import { Link } from 'react-router-dom';
import {
  FavoritesHorizontalListWrapper,
  StyledRecommendationList,
  StyledRecommendationListItem,
} from '../../styles/favorites';
import RecommendationItem from './RecommendationItem';

const HorizontalRecommendationList = () => {
  const dispatch = useAppDispatch();
  const { bestsellers } = useAppSelector((state) => state.productReducer);

  const { data, isLoading } = bestsellers;

  useEffect(() => {
    dispatch(fetchFilteredProducts({ limit: '&limit=1000' }));
    dispatch(fetchBestsellers());
  }, [dispatch]);

  return (
    <FavoritesHorizontalListWrapper>
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
      <StyledRecommendationList>
        {data.map((item, index) => (
          <RecommendationItem data={data} item={item} index={index} />
        ))}
      </StyledRecommendationList>
    </FavoritesHorizontalListWrapper>
  );
};

export default HorizontalRecommendationList;
