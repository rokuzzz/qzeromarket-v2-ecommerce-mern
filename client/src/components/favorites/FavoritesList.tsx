import styled from '@mui/material/styles/styled';
import { Box, Typography } from '@mui/material';

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
  return (
    <FavoritesListWrapper sx={styles.root}>
      <Box sx={styles.heading}>
        <Typography variant='h5' sx={styles.headingText}>
          Favorites
        </Typography>
      </Box>
    </FavoritesListWrapper>
  );
};

export default FavoritesList;
