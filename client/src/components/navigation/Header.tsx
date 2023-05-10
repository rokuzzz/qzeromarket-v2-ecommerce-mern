import { AppBar, Box, Slide, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const hasTabs =
    typeof selectedTab !== 'undefined' &&
    typeof handleTabChange !== 'undefined';

  return (
    <HideOnScroll>
      <AppBar>
        <HeaderNavigation isDownMd={isDownMd} />
        {hasTabs && (
          <HeaderTabs
            value={selectedTab}
            onChange={handleTabChange}
            isDownMd={isDownMd}
          />
        )}
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
