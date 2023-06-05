import styled from '@mui/material/styles/styled';
import { Box, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/common/appHooks';

const styles = {
  root: {
    flexGrow: 1,
  },
  heading: {
    margin: '20px',
  },
  headingText: {
    fontWeight: 700,
    opacity: '80%',
  },
};

const FavoritesListWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    margin: '0 0px',
  },
  [theme.breakpoints.up('md')]: {
    margin: '0 48px',
  },
}));

const FavoritesList = () => {
  const { usersFavorites } = useAppSelector((state) => state.favoritesReducer);
  const { data, isLoading } = usersFavorites || {
    data: {
      _id: '',
      favoritesItems: [],
    },
  };

  // Create a new favoritesCards component for each product in the list
  const favoritesCards = data.favoritesItems.map((item) => (
    <Grid item xs={6} sm={6} md={4} key={item._id}>
      {item.itemInFavorites.title}
    </Grid>
  ));

  return (
    <FavoritesListWrapper sx={styles.root}>
      <Box sx={styles.heading}>
        <Typography variant='h5' sx={styles.headingText}>
          Favorites
        </Typography>
      </Box>
      {favoritesCards}
    </FavoritesListWrapper>
  );
};

export default FavoritesList;
