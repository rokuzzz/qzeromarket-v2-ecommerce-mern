import styled from '@mui/material/styles/styled';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { useAppSelector } from '../../hooks/common/appHooks';
import FavoritesCard from './FavoritesCard';

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
  const theme = useTheme();
  const isDownMedium = useMediaQuery(theme.breakpoints.down('md'));

  const { usersFavorites } = useAppSelector((state) => state.favoritesReducer);
  const { data = { _id: '', favoritesItems: [] }, isLoading } =
    usersFavorites || {};

  // Create a new favoritesCards component for each product in the list
  const favoritesCards =
    data.favoritesItems?.map((item) => (
      <Grid item xs={6} sm={6} md={4} key={item._id}>
        <FavoritesCard itemInFavorites={item.itemInFavorites} />
      </Grid>
    )) || [];

  return (
    <FavoritesListWrapper sx={styles.root}>
      <Box sx={styles.heading}>
        <Typography variant='h5' sx={styles.headingText}>
          Favorites
        </Typography>
      </Box>
      <Grid container columnSpacing={isDownMedium ? 1 : 2} rowSpacing={2}>
        {favoritesCards}
      </Grid>
    </FavoritesListWrapper>
  );
};

export default FavoritesList;
