import { Card, CardActionArea, Skeleton } from '@mui/material';
import {
  ProductDetailsCardContent,
  ProductPriceTypography,
  ProductTitleTypography,
} from '../../../styles/products';

interface ProductCardSkeletonProps {
  styles: any;
}

const ProductCardSkeleton = ({ styles }: ProductCardSkeletonProps) => {
  const randSkeletonTitleWidth = Math.floor(Math.random() * 130) + 100;

  return (
    <Card sx={styles.card}>
      <CardActionArea>
        <Skeleton sx={styles.media} variant='rectangular' animation='wave' />
        <ProductDetailsCardContent>
          <ProductTitleTypography variant='subtitle1'>
            <Skeleton
              width={randSkeletonTitleWidth}
              variant='text'
              animation='wave'
            />
          </ProductTitleTypography>
          <ProductPriceTypography variant='overline'>
            <Skeleton width={'65px'} variant='text' animation='wave' />
          </ProductPriceTypography>
        </ProductDetailsCardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCardSkeleton;
