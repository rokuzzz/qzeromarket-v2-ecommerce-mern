import {
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  Typography,
} from '@mui/material';
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

const FavoritesCardSkeleton = () => {
  const randSkeletonTitleWidth = Math.floor(Math.random() * 130) + 100;

  return (
    <Card sx={styles.card}>
      <CardActionArea>
        <Skeleton sx={styles.media} variant='rectangular' animation='wave' />
        <FavoriteDetailsCardContent>
          <FavoriteTitleTypography variant='subtitle1'>
            <Skeleton
              width={`${randSkeletonTitleWidth}px`}
              variant='text'
              animation='wave'
            />
          </FavoriteTitleTypography>
          <FavoritePriceTypography variant='overline'>
            <Skeleton width={'65px'} variant='text' animation='wave' />
          </FavoritePriceTypography>
        </FavoriteDetailsCardContent>
      </CardActionArea>
      <Skeleton
        variant='rectangular'
        animation='wave'
        width={'100%'}
        height={'36.5px'}
        style={{ borderRadius: '4px' }}
      />
    </Card>
  );
};

export default FavoritesCardSkeleton;
