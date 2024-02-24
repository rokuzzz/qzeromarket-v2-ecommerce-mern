import { Box, Grid, Skeleton, Typography, useMediaQuery } from '@mui/material';
import {
  ButtonsWrapper,
  ImageWrapper,
  DetailsSectionWrapper,
  SquareSkeleton,
} from 'src/styles/detailsSection';

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
    skeletonCount = 17;
  } else if (isMediumScreen) {
    skeletonCount = 9;
  } else if (isLargeScreen) {
    skeletonCount = 14;
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
    <DetailsSectionWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <ImageWrapper>
            <SquareSkeleton>
              <Skeleton variant='rectangular' animation='wave' />
            </SquareSkeleton>
          </ImageWrapper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={styles.contentWrapper}>
            <Box>
              <Typography sx={styles.title} variant='h3' gutterBottom>
                {isXXSmallScreen ? (
                  <>
                    <Skeleton
                      variant='text'
                      animation='wave'
                      width={'90%'}
                      height={'34px'}
                    />
                  </>
                ) : (
                  <Skeleton
                    variant='text'
                    animation='wave'
                    width={'300px'}
                    height={'35px'}
                  />
                )}
              </Typography>
              <Typography sx={styles.price} variant='h5' gutterBottom>
                <Skeleton
                  variant='text'
                  animation='wave'
                  width={'80px'}
                  height={'33px'}
                />
              </Typography>
              <Typography sx={styles.description} variant='body1' gutterBottom>
                {typographyRowsSkeleton}
                <Skeleton variant='text' animation='wave' width={'28%'} />
              </Typography>
            </Box>
            <ButtonsWrapper>
              <Skeleton
                variant='rectangular'
                animation='wave'
                width={'100%'}
                height={'42.25px'}
                sx={{ mb: 1, borderRadius: '4px' }}
              />
              <Skeleton
                variant='rectangular'
                animation='wave'
                width={'100%'}
                height={'42.25px'}
                style={{ borderRadius: '4px' }}
              />
            </ButtonsWrapper>
          </Box>
        </Grid>
      </Grid>
    </DetailsSectionWrapper>
  );
};

export default ProductDetailsSkeleton;
