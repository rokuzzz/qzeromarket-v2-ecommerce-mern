import { Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { ReactComponent as AppLogo } from '../../assets/qzeromarket-logo.svg';

const HeaderNavigation = () => {
  return (
    <Toolbar>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        sx={{ pr: 0 }}
      >
        <MenuIcon />
      </IconButton>
      <AppLogo />
    </Toolbar>
  );
};

export default HeaderNavigation;
