import {
  Box,
  Button,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ProductDetailsWrapper } from '../../pages/ProductDetails';

interface ProductDetailsSkeletonProps {
  styles: any;
}

const ProductDetailsSkeleton = ({ styles }: ProductDetailsSkeletonProps) => {
  const isXXSmallScreen = useMediaQuery('(max-width:390px)');
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const isMediumScreen = useMediaQuery(
    '(min-width:901px) and (max-width:1200px)'
  );
  const isLargeScreen = useMediaQuery('(min-width:1201px)');

  // Set the number of Skeleton components based on the screen size
  let skeletonCount = 0;
  if (isSmallScreen) {
    skeletonCount = 14;
  } else if (isMediumScreen) {
    skeletonCount = 10;
  } else if (isLargeScreen) {
    skeletonCount = 6;
  }

  // Render the Skeleton components based on the `skeletonCount`
  const typographyRowsSkeleton = Array.from({ length: skeletonCount }).map(
    (_, index) => (
      <Skeleton
        key={index}
        variant='text'
        animation='wave'
        width={`${Math.floor(Math.random() * 21) + 80}%`}
      />
    )
  );

  return (
    <ProductDetailsWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={styles.imageWrapper}>
            <Skeleton
              variant='rectangular'
              animation='wave'
              height={isLargeScreen ? '88.5vh' : isMediumScreen ? '100%' : ''}
              width={'100%'}
              sx={isSmallScreen ? { paddingBottom: '100%' } : {}}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={styles.contentWrapper}>
            <Box>
              <Typography sx={styles.title} variant='h3' gutterBottom>
                {isXXSmallScreen ? (
                  <>
                    <Skeleton variant='text' animation='wave' width={'90%'} />
                    <Skeleton variant='text' animation='wave' width={'60%'} />
                  </>
                ) : (
                  <Skeleton variant='text' animation='wave' width={'300px'} />
                )}
              </Typography>
              <Typography sx={styles.description} variant='body1' gutterBottom>
                {typographyRowsSkeleton}
                <Skeleton variant='text' animation='wave' width={'28%'} />
              </Typography>
              <Typography sx={styles.price} variant='h5' gutterBottom>
                <Skeleton variant='text' animation='wave' width={'220px'} />
              </Typography>
            </Box>
            <Box sx={styles.buttonsWrapper}>
              <Skeleton
                variant='rectangular'
                animation='wave'
                width={'100%'}
                height={'42.25px'}
                sx={{ mb: 1 }}
              />
              <Skeleton
                variant='rectangular'
                animation='wave'
                width={'100%'}
                height={'42.25px'}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ProductDetailsWrapper>
  );
};

export default ProductDetailsSkeleton;
