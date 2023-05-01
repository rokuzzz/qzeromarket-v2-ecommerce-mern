import { AppBar, Box, Slide } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import HeaderTabs from './HeaderTabs';
import HeaderNavigation from './HeaderNavigation';

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction={'down'} in={!trigger}>
      {children}
    </Slide>
  );
}

interface HeaderProps {
  selectedTab?: number;
  handleTabChange?: (event: React.SyntheticEvent, newValue: number) => void;
}

const Header = ({ selectedTab, handleTabChange }: HeaderProps) => {
  const hasTabs =
    typeof selectedTab !== 'undefined' && typeof handleTabChange !== 'undefined';

  return (
    <HideOnScroll>
      <AppBar>
        <HeaderNavigation />
        {hasTabs && <HeaderTabs value={selectedTab} onChange={handleTabChange} />}
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
