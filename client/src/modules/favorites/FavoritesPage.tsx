import { Toolbar } from '@mui/material';

import { useAppSelector } from '../common/hooks/appHooks';
import useToken from '../common/hooks/useToken';
import useFetchUserFavorites from './hooks/useFetchUserFavorites';
import Header from '../navigation/Header';
import FavoritesList from './components/FavoritesList';
import FeaturedItemsCarousel from './components/FeaturedItemsCarousel';
import Footer from '../navigation/Footer';

const FavoritesPage = () => {
  const { data } = useAppSelector((state) => state.authReducer.loggedInUser);

  const { _id: userId } = data || { _id: '' };
  const token = useToken();

  useFetchUserFavorites({ userId, token });

  return (
    <>
      <Header />
      <Toolbar sx={{ height: '60px' }} />
      <FavoritesList />
      <FeaturedItemsCarousel />
      <Footer />
    </>
  );
};

export default FavoritesPage;
