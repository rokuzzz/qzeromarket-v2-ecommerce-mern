import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
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
  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Skeleton variant='rectangular' animation='wave' height='100%' />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={classes.contentWrapper}>
            <Box>
              <Typography className={classes.title} variant='h3' gutterBottom>
                <Skeleton variant='text' animation='wave' />
              </Typography>
              <Typography
                className={classes.description}
                variant='body1'
                gutterBottom
              >
                <Skeleton variant='text' animation='wave' width={'100%'} />
                <Skeleton variant='text' animation='wave' width={'90%'} />
                <Skeleton variant='text' animation='wave' width={'83%'} />
                <Skeleton variant='text' animation='wave' width={'95%'} />
                <Skeleton variant='text' animation='wave' width={'92%'} />
                <Skeleton variant='text' animation='wave' width={'96%'} />
                <Skeleton variant='text' animation='wave' width={'100%'} />
                <Skeleton variant='text' animation='wave' width={'96%'} />
                <Skeleton variant='text' animation='wave' width={'94%'} />
                <Skeleton variant='text' animation='wave' width={'97%'} />
                <Skeleton variant='text' animation='wave' width={'20%'} />
              </Typography>
              <Typography className={classes.price} variant='h5' gutterBottom>
                <Skeleton variant='text' animation='wave' width={'48%'} />
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
