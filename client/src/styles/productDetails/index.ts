import { Box } from '@mui/material';
import styled from '@mui/material/styles/styled';

// ProductDetails
export const ProductDetailsWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    margin: '0 0 16px',
    padding: '0px',
  },
  [theme.breakpoints.up('lg')]: {
    margin: '50px 104px 50px 104px',
    padding: '0 48px',
  },
  margin: '52px 16px 52px',
  padding: '0 16px',
}));

// ProductDetailsContent
export const ButtonsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '24px 0 0',
  [theme.breakpoints.up('md')]: {
    position: 'absolute',
    bottom: '8px',
    left: '16px',
    right: '32px',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0px',
  },
}));

// ProductDetailsImage
export const ImageWrapper = styled(Box)(({ theme }) => ({
  height: '100%',
  padding: '0 16px',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '0px',
  },
}));

// ProductDetailsSkeleton
export const SquareSkeleton = styled('div')`
  position: relative;
  width: 100%;
  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
  & .MuiSkeleton-root {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`;
