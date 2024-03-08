import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Theme, useTheme } from '@mui/material/styles';
import { Toolbar, IconButton, Box, Button, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { ReactComponent as AppLogo } from '../assets/qzeromarket-logo.svg';
import CartDrawer from '../../cart/CartDrawer';

interface HeaderNavigationProps {
  isDownMd: boolean;
}

const linkStyle: React.CSSProperties | undefined = {
  textDecoration: 'none',
  color: '#0B1215',
  textTransform: 'uppercase',
  fontWeight: 500,
};

const HeaderNavigation = ({ isDownMd }: HeaderNavigationProps) => {
  const theme: Theme = useTheme();

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const [cartIsOpen, setCartIsOpen] = useState(false);
  const toggleCartOpen = () => setCartIsOpen(!cartIsOpen);

  return (
    <Toolbar
      sx={
        isDownMd
          ? { margin: '4px 16px 0px 16px', padding: '0px' }
          : { margin: '4px 148px 0px 164px', padding: '12px 0px' }
      }
    >
      <Grid container alignItems='center'>
        <Grid item md={4} lg={3} container justifyContent='space-between'>
          <Link to={'/'} style={linkStyle}>
            Home
          </Link>
          <Link to={'/'} style={linkStyle}>
            Store
          </Link>
          <Link to={'/'} style={linkStyle}>
            About
          </Link>
        </Grid>

        <Grid item md={4} lg={6} container justifyContent='center'>
          <Link
            to={'/'}
            style={{ textDecoration: 'none', width: '100px' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AppLogo
              key={new Date().getTime()}
              fill={isHovered ? theme.palette.secondary.main : '#0B1215'}
              style={{ width: '100px' }}
            />
          </Link>
        </Grid>

        <Grid item md={4} lg={3} container justifyContent='space-between'>
          <Link to={'/'} style={linkStyle}>
            Profile
          </Link>
          <Link to={'/favorites'} style={linkStyle}>
            Favs
          </Link>
          <Link to={'/'} style={linkStyle}>
            Cart
          </Link>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default HeaderNavigation;
