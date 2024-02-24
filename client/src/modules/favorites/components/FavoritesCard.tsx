import { Button, Card, CardActionArea, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ItemInFavorites } from '../../common/types/favoritesTypes';
import { useAppDispatch, useAppSelector } from '../../common/hooks/appHooks';
import { modifyFavorites } from '../redux/favoritesSlice';
import useToken from '../../common/hooks/useToken';
import { modifyCart } from '../../cart/redux/cartSlice';
import {
  FavoriteDetailsCardContent,
  FavoritePriceTypography,
  FavoriteTitleTypography,
} from '../../../styles/favorites';

const styles = {
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0px',
    boxShadow: 'none',
  },
  link: {
    textDecoration: 'none',
    outline: 'none',
    color: 'inherit',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      color: 'inherit',
    },
  },
  media: {
    height: 0,
    width: '100%',
    paddingTop: '100%', // 1:1 aspect ratio
  },
  cardContent: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: '0.9rem',
    lineHeight: 1.2,
    margin: '8px 0 0',
    whiteSpace: 'nowrap',
  },
  price: {
    fontSize: '1rem',
    fontWeight: 900,
    lineHeight: 1.2,
    opacity: '80%',
    margin: '4px 0 16px',
  },
};

interface FavoritesCardProps {
  itemInFavorites: ItemInFavorites;
}

const FavoritesCard = ({ itemInFavorites }: FavoritesCardProps) => {
  const { _id, title, price } = itemInFavorites;

  const dispatch = useAppDispatch();
  const token = useToken();
  const { allProducts } = useAppSelector((state) => state.productReducer);

  // Helper function to find the product image url
  const findProductImageUrl = () => {
    return allProducts.data.find((product) => product._id === _id)?.imageUrl;
  };

  const handleMoveToCart = () => {
    dispatch(modifyCart({ title, quantity: 1, token }));
    dispatch(modifyFavorites({ title, token }));

    toast.success(`${title} added to cart!`, {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  return (
    <Card sx={styles.card}>
      <CardActionArea>
        <Link to={`/products/${_id}`} style={styles.link}>
          <CardMedia
            image={findProductImageUrl()}
            title={title}
            sx={styles.media}
          />
        </Link>
        <FavoriteDetailsCardContent>
          <FavoriteTitleTypography variant='subtitle1'>
            {title}
          </FavoriteTitleTypography>
          <FavoritePriceTypography variant='subtitle1'>
            €{price}.00
          </FavoritePriceTypography>
        </FavoriteDetailsCardContent>
      </CardActionArea>
      <Button variant='outlined' onClick={handleMoveToCart}>
        Move to cart
      </Button>
    </Card>
  );
};

export default FavoritesCard;
