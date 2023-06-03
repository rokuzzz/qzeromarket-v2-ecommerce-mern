import { Toolbar } from '@mui/material';

import Header from '../components/navigation/Header';
import FavoritesList from '../components/favorites/FavoritesList';

const Favorites = () => {
  return (
    <>
      <Header />
      <Toolbar sx={{ height: '60px' }} />
      <FavoritesList />
    </>
  );
};

export default Favorites;
