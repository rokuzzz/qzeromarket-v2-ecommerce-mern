import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { ItemInFavorites } from '../../types/favorites';
import { useAppSelector } from '../../hooks/common/appHooks';

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
  const { allProducts } = useAppSelector((state) => state.productReducer);

  const imageUrl = allProducts.data.find(
    (product) => product._id === itemInFavorites._id
  )?.imageUrl;

  return (
    <Card sx={styles.card}>
      <CardActionArea>
        <Link to={`/products/${itemInFavorites._id}`} style={styles.link}>
          <CardMedia
            image={imageUrl}
            title={itemInFavorites.title}
            sx={styles.media}
          />
        </Link>
        <CardContent sx={styles.cardContent}>
          <Typography variant='subtitle1' sx={styles.title}>
            {itemInFavorites.title}
          </Typography>
          <Typography variant='overline' sx={styles.price}>
            €{itemInFavorites.price}.00
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button variant='outlined'>Move to cart</Button>
    </Card>
  );
};

export default FavoritesCard;
