import { Button, Tab } from '@mui/material';
import styled from '@mui/material/styles/styled';

// NavBarDesktop
export const linkStyle: React.CSSProperties | undefined = {
  textDecoration: 'none',
  color: '#0B1215',
  textTransform: 'uppercase',
  fontWeight: 500,
};

export const ToggleCartButton = styled(Button)({
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

// HeaderTabs
export const StyledTab = styled(Tab)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: '180px',
  },
}));
