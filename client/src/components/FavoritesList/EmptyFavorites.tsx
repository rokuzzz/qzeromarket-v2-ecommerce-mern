import { Box, Button, Container, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';

const EmptyFavorites = () => {
  return (
    <Container
      sx={{
        margin: '144px auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FavoriteBorderIcon fontSize='large' />
      <Typography variant='h5' sx={{ mt: 2, fontWeight: 700 }}>
        Your have no Favorites
      </Typography>
      <Typography variant='subtitle2' sx={{ mt: 2 }}>
        Start saving as you shop by selecting the little heart.
      </Typography>
      <Typography variant='subtitle2'>
        We'll sync your items across all your devices. Easy.
      </Typography>
      <Link to={'/'}>
        <Button
          variant='contained'
          size='large'
          color='secondary'
          sx={{ mt: 3 }}
        >
          Start Shopping
        </Button>
      </Link>
    </Container>
  );
};

export default EmptyFavorites;
