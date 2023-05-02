import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Theme, useTheme } from '@mui/material/styles';
import { Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { ReactComponent as AppLogo } from '../../assets/qzeromarket-logo.svg';
import CartDrawer from './CartDrawer';

const HeaderNavigation = () => {
  const theme: Theme = useTheme();

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const [cartIsOpen, setCartIsOpen] = useState(false);
  const toggleCartOpen = () => setCartIsOpen(!cartIsOpen);

  return (
    <Toolbar sx={{ m: 0, p: 0 }}>
      <Link
        to={'/'}
        style={{ textDecoration: 'none' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AppLogo
          key={new Date().getTime()}
          fill={
            isHovered
              ? theme.palette.secondary.main
              : theme.palette.primary.contrastText
          }
        />
      </Link>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <IconButton size='large' color='inherit' aria-label='profile'>
          <FavoriteIcon />
        </IconButton>
        <IconButton
          size='large'
          color='inherit'
          aria-label='cart'
          onClick={toggleCartOpen}
        >
          <ShoppingBagIcon />
        </IconButton>
        <CartDrawer cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} />
        <IconButton size='large' color='inherit' aria-label='profile'>
          <AccountCircleIcon />
        </IconButton>
      </Box>
    </Toolbar>
  );
};

export default HeaderNavigation;
