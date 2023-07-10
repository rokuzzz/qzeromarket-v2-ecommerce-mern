import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { useAppSelector } from '../../hooks/common/appHooks';
import FavoritesCard from './FavoritesCard';
import FavoritesCardSkeleton from './FavoritesCardSkeleton';
import { FavoritesListWrapper, StyledHeadingBox } from '../../styles/favorites';
import EmptyFavorites from './EmptyFavorites';

const styles = {
  root: {
    flexGrow: 1,
  },
  headingText: {
    fontWeight: 700,
    opacity: '80%',
  },
};

const FavoritesList = () => {
  const theme = useTheme();
  const isDownMedium = useMediaQuery(theme.breakpoints.down('md'));

  const { usersFavorites } = useAppSelector((state) => state.favoritesReducer);
  const { data = { _id: '', favoritesItems: [] }, isLoading } =
    usersFavorites || {};

  // Create a new favoritesCards component for each product in the list
  const favoritesCards = data.favoritesItems?.map((item, index) => (
    <Grid item xs={6} sm={6} md={4} key={index + '.' + item._id}>
      <FavoritesCard itemInFavorites={item.itemInFavorites} />
    </Grid>
  ));

  // When the page is loading, render the skeleton grid instead
  const numSkeletonCards = Math.floor(Math.random() * 6) + 1;
  const skeletonCards = [...Array(numSkeletonCards)].map((_, index) => (
    <Grid item xs={6} sm={6} md={4} key={index} sx={{ flexGrow: 1 }}>
      <FavoritesCardSkeleton />
    </Grid>
  ));

  return (
    <FavoritesListWrapper sx={styles.root}>
      {data.favoritesItems?.length > 0 ? (
        <>
          <StyledHeadingBox>
            <Typography variant='h5' sx={styles.headingText}>
              Favorites
            </Typography>
          </StyledHeadingBox>
          <Grid
            container
            columnSpacing={isDownMedium ? 2 : 4}
            rowSpacing={isDownMedium ? 3 : 6}
          >
            {isLoading ? skeletonCards : favoritesCards}
          </Grid>
        </>
      ) : (
        <EmptyFavorites />
      )}
    </FavoritesListWrapper>
  );
};

export default FavoritesList;
