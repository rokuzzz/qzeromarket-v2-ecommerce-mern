import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { ReactComponent as AppLogo } from 'src/modules/common/assets/qzeromarket-logo.svg';
import CartDrawer from 'src/modules/cart/CartDrawer';

function NavBarMobile() {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const toggleCartOpen = () => setCartIsOpen(!cartIsOpen);

  return (
    <Toolbar>
      <IconButton
        size='large'
        edge='start'
        color='primary'
        aria-label='menu'
        sx={{ mr: 1 }}
      >
        <MenuIcon />
      </IconButton>
      <Link
        to={'/'}
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <AppLogo key={new Date().getTime()} style={{ width: '60px' }} />
      </Link>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <IconButton
          size='large'
          aria-label='open profile settings'
          color='primary'
        >
          <AccountCircleIcon />
        </IconButton>
        <Link
          to={'/favorites'}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <IconButton size='large' aria-label='view favorites' color='primary'>
            <FavoriteIcon />
          </IconButton>
        </Link>
        <IconButton
          size='large'
          aria-label='toggle cart'
          color='primary'
          onClick={toggleCartOpen}
        >
          <ShoppingBagIcon />
        </IconButton>
        <CartDrawer cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} />
      </Box>
    </Toolbar>
  );
}

export default NavBarMobile;
