import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/common/appHooks';
import { useEffect } from 'react';
import { fetchAllProducts } from '../../redux/slices/productSlice';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0px',
    boxShadow: 'none',
  },
  link: {
    textDecoration: 'none',
    outline: 'none',
    color: 'inherit',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      color: 'inherit',
    },
  },
  cardContent: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  media: {
    height: 0,
    width: '100%',
    paddingTop: '100%', // 1:1 aspect ratio
  },
  heading: {
    margin: '20px',
  },
  headingText: {
    fontWeight: 700,
    opacity: '80%',
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
    margin: '4px 0 32px',
  },
};

const HorizontalRecommendationList = () => {
  const dispatch = useAppDispatch();
  const { allProducts } = useAppSelector((state) => state.productReducer);

  const { data, isLoading } = allProducts;

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        categories: '&categories=Bestsellers',
        limit: '&limit=100',
      })
    );
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        flexDirection: 'row',
        scrollbarWidth: 'none', // for Firefox
        '&::-webkit-scrollbar': {
          display: 'none', // for Chrome, Safari, and Opera
        },
      }}
    >
      <Grid container spacing={2} direction='row'>
        {data.map((item, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            sx={{ minWidth: 200, flexShrink: 0 }}
          >
            <Card sx={styles.card}>
              <Link style={styles.link} to={`/products/${item._id}`}>
                <CardActionArea>
                  <CardMedia
                    sx={styles.media}
                    image={item.imageUrl}
                    title={item.title}
                  />
                  <CardContent sx={styles.cardContent}>
                    <Typography variant='subtitle1' sx={styles.title}>
                      {item.title}
                    </Typography>
                    <Typography variant='overline' sx={styles.price}>
                      €{item.price}.00
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HorizontalRecommendationList;
