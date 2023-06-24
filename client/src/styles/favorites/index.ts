import { CardContent, Typography } from '@mui/material';
import styled from '@mui/material/styles/styled';

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
