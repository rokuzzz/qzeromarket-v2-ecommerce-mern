import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Theme, styled, useTheme } from '@mui/material/styles';
import { Toolbar, IconButton, Box, Button, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { ReactComponent as AppLogo } from 'src/modules/common/assets/qzeromarket-logo.svg';
import CartDrawer from '../../cart/CartDrawer';

const linkStyle: React.CSSProperties | undefined = {
  textDecoration: 'none',
  color: '#0B1215',
  textTransform: 'uppercase',
  fontWeight: 500,
};

const ToggleCartButton = styled(Button)({
  fontSize: '16px',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  color: '#0B1215',
  lineHeight: 1,
  textTransform: 'uppercase',
  fontWeight: 500,
  padding: 0,
  minWidth: 'auto',
  minHeight: 'auto',
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

const NavBarDesktop = () => {
  const theme: Theme = useTheme();

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const [cartIsOpen, setCartIsOpen] = useState(false);
  const toggleCartOpen = () => setCartIsOpen(!cartIsOpen);

  return (
    <Toolbar sx={{ margin: '4px 148px 0px 164px', padding: '12px 0px' }}>
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
          <ToggleCartButton variant={'text'} onClick={toggleCartOpen}>
            Cart
          </ToggleCartButton>
          <CartDrawer cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} />
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default NavBarDesktop;
