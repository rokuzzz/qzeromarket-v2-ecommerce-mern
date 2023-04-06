import { AppBar, Slide, Toolbar } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';

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
  return (
    <HideOnScroll>
      <AppBar
        sx={{
          background: '#FFFFFF',
        }}
      >
        <Toolbar></Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
