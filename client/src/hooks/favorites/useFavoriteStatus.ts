import { useEffect, useState } from 'react';
import { useAppSelector } from '../common/appHooks';

interface useCheckIsInFavorites {
  title: string;
}

const useFavoriteStatus = ({ title }: useCheckIsInFavorites) => {
  const { usersFavorites } = useAppSelector((state) => state.favoritesReducer);

  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    if (
      usersFavorites?.data?.favoritesItems.find(
        (i) => i.itemInFavorites.title === title
      )
    ) {
      setIsInFavorites(true);
    } else {
      setIsInFavorites(false);
    }
  }, []);

  return { isInFavorites, setIsInFavorites };
};

export default useFavoriteStatus;
