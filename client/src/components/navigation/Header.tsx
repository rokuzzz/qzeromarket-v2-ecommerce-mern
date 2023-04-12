import { useState } from 'react';
import {
  AppBar,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  Grid,
  Tabs,
  Tab,
  Badge,
  useTheme,
} from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';

import { StyledTab, StyledTabs } from '../../styles/navigation';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ReactComponent as AppLogo } from '../../assets/app-logo.svg';

interface Props {
  children: React.ReactElement;
}

function HideOnScroll({ children }: Props) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction={'down'} in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <HideOnScroll>
      <AppBar>
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
          <AppLogo style={{ border: '1px solid red;' }} />
        </Toolbar>
        <StyledTabs
          value={selectedTab}
          onChange={handleChange}
          textColor={'inherit'}
          indicatorColor='secondary'
          aria-label='main categories'
          sx={{
            margin: '0 auto',
          }}
        >
          <StyledTab label='All' />
          <StyledTab label='New in' />
          <StyledTab label='Clothing' />
          <StyledTab label='Shoes' />
          <StyledTab label='Accessories' />
        </StyledTabs>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
