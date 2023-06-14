import { useEffect } from 'react';

import { getUsersFavorites } from '../../redux/slices/favoritesSlice';
import { useAppDispatch } from '../common/appHooks';

interface useFetchUserFavoritesProps {
  userId: string;
  token: string;
}

const useFetchUserFavorites = ({
  userId,
  token,
}: useFetchUserFavoritesProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId && token) {
      dispatch(getUsersFavorites({ userId, token }));
    }
  }, [dispatch, userId, token, dispatch]);
};

export default useFetchUserFavorites;
