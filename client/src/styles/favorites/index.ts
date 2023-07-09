import {
  Box,
  CardContent,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import styled from '@mui/material/styles/styled';

// FavoritesList
export const FavoritesListWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    margin: '0 8px 32px 8px',
  },
  [theme.breakpoints.up('md')]: {
    margin: '0 48px 48px 48px',
  },
}));

export const StyledHeadingBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    margin: '25px 0 10px',
  },
  [theme.breakpoints.up('md')]: {
    margin: '50px 0 20px',
  },
}));

// FavoritesCard
export const FavoriteDetailsCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  [theme.breakpoints.up('sm')]: {
    padding: '4px 0 0 0',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '4px 12px 0px 12px',
  },
}));

export const FavoriteTitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: 1.2,
  margin: '12px 0 0',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem',
  },
}));

export const FavoritePriceTypography = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: 1.2,
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem',
    fontWeight: 700,
    opacity: '80%',
  },
  [theme.breakpoints.up('sm')]: {
    margin: '12px 0 32px',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '12px 0 16px',
  },
}));

// HorizontalRecommendationList
export const FavoritesHorizontalListWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    margin: '0 16px 32px 16px',
  },
  [theme.breakpoints.up('md')]: {
    margin: '0 24px 48px 24px',
  },
}));

export const StyledRecommendationList = styled(ImageList)({
  display: 'flex',
  flexDirection: 'row',
  overflowX: 'scroll',
  scrollbarWidth: 'none', // For Firefox
  '&::-webkit-scrollbar': {
    display: 'none', // For Chrome, Safari and Opera
  },
});

export const StyledRecommendationListItem = styled(ImageListItem)({
  flex: '0 0 auto',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
