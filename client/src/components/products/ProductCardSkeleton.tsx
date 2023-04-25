import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from '@mui/material';
import { ClassNameMap } from '@mui/material/styles';

interface ProductCardSkeletonProps {
  useStyles: (
    props?: any
  ) => ClassNameMap<
    | 'root'
    | 'card'
    | 'link'
    | 'cardActionArea'
    | 'cardContent'
    | 'media'
    | 'title'
    | 'price'
  >;
}

const ProductCardSkeleton = ({ useStyles }: ProductCardSkeletonProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardActionArea}>
        <Skeleton
          className={classes.media}
          variant='rectangular'
          animation='wave'
        />

        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} variant='subtitle1'>
            <Skeleton width={'150px'} variant='text' animation='wave' />
          </Typography>
          <Typography
            className={classes.price}
            sx={{ margin: '0.5 0 2' }}
            variant='overline'
          >
            <Skeleton width={'80px'} variant='text' animation='wave' />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCardSkeleton;
