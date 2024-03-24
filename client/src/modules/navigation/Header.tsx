import { AppBar, Slide, useMediaQuery, useTheme } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import HeaderTabs from './components/HeaderTabs';
import NavBarDesktop from './components/NavBarDesktop';
import NavBarMobile from './components/NavBarMobile';

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
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const hasTabs =
    typeof selectedTab !== 'undefined' &&
    typeof handleTabChange !== 'undefined';

  return (
    <HideOnScroll>
      <AppBar
        sx={{
          backgroundColor: '#ffffff',
          width: '100%',
          margin: 0,
          padding: '0px',
          boxSizing: 'border-box',
        }}
      >
        {isDownMd ? <NavBarMobile /> : <NavBarDesktop />}
        {hasTabs && (
          <HeaderTabs
            value={selectedTab}
            onChange={handleTabChange}
            isUpMd={isUpMd}
            isDownSm={isDownSm}
          />
        )}
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
