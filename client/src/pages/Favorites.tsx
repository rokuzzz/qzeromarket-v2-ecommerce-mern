import { Toolbar } from '@mui/material';

import Header from '../components/navigation/Header';
import FavoritesList from '../components/favorites/FavoritesList';
import { useAppSelector } from '../hooks/common/appHooks';
import useToken from '../hooks/common/useToken';
import useFetchUserFavorites from '../hooks/favorites/useFetchUserFavorites';

const Favorites = () => {
  const { loggedInUser } = useAppSelector((state) => state.userReducer);

  const { _id: userId } = loggedInUser.data || { _id: '' };
  const token = useToken();

  useFetchUserFavorites({ userId, token });

  return (
    <>
      <Header />
      <Toolbar sx={{ height: '60px' }} />
      <FavoritesList />
    </>
  );
};

export default Favorites;
