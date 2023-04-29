import {
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  Typography,
} from '@mui/material';

interface ProductCardSkeletonProps {
  styles: any;
}

const ProductCardSkeleton = ({ styles }: ProductCardSkeletonProps) => {
  return (
    <Card sx={styles.card}>
      <CardActionArea>
        <Skeleton sx={styles.media} variant='rectangular' animation='wave' />
        <CardContent sx={styles.cardContent}>
          <Typography sx={styles.title} variant='subtitle1'>
            <Skeleton width={'150px'} variant='text' animation='wave' />
          </Typography>
          <Typography sx={styles.price} variant='overline'>
            <Skeleton width={'80px'} variant='text' animation='wave' />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCardSkeleton;
