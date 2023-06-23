import { CardContent } from '@mui/material';
import styled from '@mui/material/styles/styled';

// ProductCard & ProductCardSkeleton
export const ProductDetailsCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    padding: '4px 0 0 0',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '4px 12px 0px 12px',
  },
}));
