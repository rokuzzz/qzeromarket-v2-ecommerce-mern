import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, IconButton } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

import { ReactComponent as AppLogo } from '../../assets/qzeromarket-logo.svg';

const HeaderNavigation = () => {
  const theme: Theme = useTheme();

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <Toolbar sx={{ m: 0, p: 0 }}>
      {/* <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        sx={{ pr: 0 }}
      >
        <MenuIcon />
      </IconButton> */}
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
    </Toolbar>
  );
};

export default HeaderNavigation;
