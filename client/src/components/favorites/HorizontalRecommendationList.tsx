import { useEffect } from 'react';
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';
import styled from '@mui/material/styles/styled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useAppDispatch, useAppSelector } from '../../hooks/common/appHooks';
import {
  fetchBestsellers,
  fetchFilteredProducts,
} from '../../redux/slices/productSlice';
import { Link } from 'react-router-dom';

const FavoritesHorizontalListWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    margin: '0 16px 32px 16px',
  },
  [theme.breakpoints.up('md')]: {
    margin: '0 24px 48px 24px',
  },
}));

const HorizontalRecommendationList = () => {
  const dispatch = useAppDispatch();
  const { bestsellers } = useAppSelector((state) => state.productReducer);

  const { data, isLoading } = bestsellers;

  useEffect(() => {
    dispatch(fetchFilteredProducts({}));

    dispatch(fetchBestsellers());
  }, []);

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
      <ImageList
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'scroll',
          scrollbarWidth: 'none', // For Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // For Chrome, Safari and Opera
          },
        }}
      >
        {data.map((item, index) => (
          <ImageListItem
            key={index}
            sx={{
              flex: '0 0 auto',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: { xs: '65%', sm: '40%', md: '27%' },
              marginLeft: {
                xs: index === 0 ? '8px' : '0.1rem',
                sm: index === 0 ? '16px' : '0.1rem',
                md: index === 0 ? '48px' : '0.25rem',
              },
              marginRight: {
                xs: index === data.length - 1 ? '8px' : '0.1rem',
                sm: index === data.length - 1 ? '16px' : '0.1rem',
                md: index === data.length - 1 ? '48px' : '0.25rem',
              },
            }}
          >
            <Link to={`/products/${item._id}`}>
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{ width: '100%' }}
              />
            </Link>
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, ' +
                  'rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
              }}
              title={item.title}
              position='top'
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`star ${item.title}`}
                >
                  <FavoriteBorderIcon />
                </IconButton>
              }
              actionPosition='left'
            />
          </ImageListItem>
        ))}
      </ImageList>
    </FavoritesHorizontalListWrapper>
  );
};

export default HorizontalRecommendationList;
