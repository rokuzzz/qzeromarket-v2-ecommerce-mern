import {
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  Typography,
} from '@mui/material';
import { ProductDetailsCardContent } from '../../styles/products';

interface ProductCardSkeletonProps {
  styles: any;
}

const ProductCardSkeleton = ({ styles }: ProductCardSkeletonProps) => {
  return (
    <Card sx={styles.card}>
      <CardActionArea>
        <Skeleton sx={styles.media} variant='rectangular' animation='wave' />
        <ProductDetailsCardContent>
          <Typography sx={styles.title} variant='subtitle1'>
            <Skeleton width={'150px'} variant='text' animation='wave' />
          </Typography>
          <Typography sx={styles.price} variant='overline'>
            <Skeleton width={'80px'} variant='text' animation='wave' />
          </Typography>
        </ProductDetailsCardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCardSkeleton;
