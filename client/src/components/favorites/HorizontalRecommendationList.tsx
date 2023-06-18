import { useEffect } from 'react';
import {
  Box,
  CardActionArea,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';
import styled from '@mui/material/styles/styled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useAppDispatch, useAppSelector } from '../../hooks/common/appHooks';
import { fetchAllProducts } from '../../redux/slices/productSlice';
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
    <FavoritesHorizontalListWrapper>
      <Typography variant='h5' sx={{ fontWeight: 700, opacity: '80%' }}>
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
              margin: 0.5,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '27%',
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
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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
