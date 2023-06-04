import { Toolbar } from '@mui/material';

import Header from '../components/navigation/Header';
import FavoritesList from '../components/favorites/FavoritesList';
import { useAppDispatch, useAppSelector } from '../hooks/common/appHooks';
import { useEffect } from 'react';
import { getUsersFavorites } from '../redux/slices/favoritesSlice';

const Favorites = () => {
  const { usersFavorites } = useAppSelector((state) => state.favoritesReducer);
  const { data, isLoading } = usersFavorites || {
    data: { _id: '', favoritesItems: [] },
  };

  const dispatch = useAppDispatch();

  const accessToken = localStorage.getItem('access_token') || '';

  // useEffect(() => {
  //   dispatch(
  //     getUsersFavorites({
  //       userId: '',
  //       token: accessToken,
  //     })
  //   );
  // }, [data, isLoading]);

  return (
    <>
      <Header />
      <Toolbar sx={{ height: '60px' }} />
      <FavoritesList />
    </>
  );
};

export default Favorites;
