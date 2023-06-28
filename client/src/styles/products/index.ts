import { CardContent, Typography } from '@mui/material';
import styled from '@mui/material/styles/styled';

// ProductCard & ProductCardSkeleton
export const ProductDetailsCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    padding: '4px 0 0 0',
  },
  [theme.breakpoints.down('md')]: {
    padding: '4px 12px 0px 12px',
  },
}));

export const ProductTitleTypography = styled(Typography)({
  fontSize: '0.9rem',
  fontWeight: 500,
  lineHeight: 1.2,
  margin: '12px 0 0',
  whiteSpace: 'nowrap',
});

export const ProductPriceTypography = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 700,
  lineHeight: 1.2,
  opacity: '80%',
  [theme.breakpoints.up('sm')]: {
    margin: '12px 0 32px',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '12px 0 16px',
  },
}));
