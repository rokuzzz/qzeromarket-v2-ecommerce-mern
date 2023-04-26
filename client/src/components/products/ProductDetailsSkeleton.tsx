import {
  Box,
  Button,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ClassNameMap } from '@mui/material/styles';

interface ProductDetailsSkeletonProps {
  useStyles: (
    props?: any
  ) => ClassNameMap<
    | 'title'
    | 'image'
    | 'root'
    | 'imageWrapper'
    | 'contentWrapper'
    | 'description'
    | 'price'
    | 'buttonsWrapper'
  >;
}

const ProductDetailsSkeleton = ({ useStyles }: ProductDetailsSkeletonProps) => {
  const classes = useStyles();

  // Get the current screen size using the `useMediaQuery` hook
  const isXXSScreen = useMediaQuery('(max-width:390px)');
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
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              paddingBottom: isSmallScreen ? '100%' : undefined,
              position: 'relative',
            }}
          >
            <Skeleton
              variant='rectangular'
              animation='wave'
              height={isLargeScreen ? '88vh' : '100%'}
              width={'100%'}
              sx={{ position: 'absolute', top: 0, left: 0 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={classes.contentWrapper}>
            <Box>
              <Typography className={classes.title} variant='h3' gutterBottom>
                {isXXSScreen ? (
                  <>
                    <Skeleton variant='text' animation='wave' width={'90%'} />
                    <Skeleton variant='text' animation='wave' width={'60%'} />
                  </>
                ) : (
                  <Skeleton variant='text' animation='wave' width={'300px'} />
                )}
              </Typography>
              <Typography
                className={classes.description}
                variant='body1'
                gutterBottom
              >
                {typographyRowsSkeleton}
                <Skeleton variant='text' animation='wave' width={'28%'} />
              </Typography>
              <Typography className={classes.price} variant='h5' gutterBottom>
                <Skeleton variant='text' animation='wave' width={'220px'} />
              </Typography>
            </Box>
            <Box className={classes.buttonsWrapper}>
              <Button
                variant='contained'
                color='primary'
                size='large'
                fullWidth
              >
                Add to Cart
              </Button>
              <Button variant='outlined' color='primary' size='large' fullWidth>
                Add to Favorites
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetailsSkeleton;
