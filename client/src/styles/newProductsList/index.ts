import { Box } from '@mui/material';
import styled from '@mui/material/styles/styled';

export const NewProductsListWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    margin: '24px 48px',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    margin: '24px 24px',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '24px 0px',
  },
}));
