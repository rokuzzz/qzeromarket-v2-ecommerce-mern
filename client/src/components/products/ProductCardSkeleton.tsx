import {
  Card,
  CardActionArea,
  Skeleton,
} from '@mui/material';
import {
  ProductDetailsCardContent,
  ProductPriceTypography,
  ProductTitleTypography,
} from '../../styles/products';

interface ProductCardSkeletonProps {
  styles: any;
}

const ProductCardSkeleton = ({ styles }: ProductCardSkeletonProps) => {
  return (
    <Card sx={styles.card}>
      <CardActionArea>
        <Skeleton sx={styles.media} variant='rectangular' animation='wave' />
        <ProductDetailsCardContent>
          <ProductTitleTypography variant='subtitle1'>
            <Skeleton width={'150px'} variant='text' animation='wave' />
          </ProductTitleTypography>
          <ProductPriceTypography variant='overline'>
            <Skeleton width={'80px'} variant='text' animation='wave' />
          </ProductPriceTypography>
        </ProductDetailsCardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCardSkeleton;
