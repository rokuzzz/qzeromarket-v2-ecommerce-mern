import { Tab, Tabs, Toolbar, styled } from "@mui/material";

// export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
//   alignItems: 'flex-start',
//   paddingTop: theme.spacing(2),
//   paddingBottom: theme.spacing(2),
//   // Override media queries injected by theme.mixins.toolbar
//   minHeight: 128,
// }));

// export const StyledTabs = styled(Tabs)(({ theme }) => ({
//   marginTop: theme.spacing(2),
// }));

export const StyledTab = styled(Tab)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: '125px'
  },
}));