import {
  AppBar,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  Grid,
} from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';

import { StyledToolbar } from '../../styles/navigation';

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
      // sx={{
      //   background: '#FFFFFF',
      // }}
      >
        <StyledToolbar>
          <Grid container>
            <Grid item xs={12} height={'64px'}>
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='open drawer'
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography>
                Hi
              </Typography>
            </Grid>
            <Grid item xs={12} height={'64px'}>
              <Typography>Here</Typography>
            </Grid>
          </Grid>
          {/* <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h5'
            noWrap
            component='div'
            sx={{ flexGrow: 1, alignSelf: 'flex-end' }}
          >
            qzeromarket
          </Typography>
          <IconButton size='large' aria-label='search' color='inherit'>
            <SearchIcon />
          </IconButton>
          <IconButton
            size='large'
            aria-label='display more actions'
            edge='end'
            color='inherit'
          >
            <MoreIcon />
          </IconButton> */}
        </StyledToolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
