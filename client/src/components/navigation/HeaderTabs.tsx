import { Box, Tab, TabScrollButton, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

interface HeaderTabsProps {
  value?: number;
  onChange?: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTab = styled(Tab)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: '125px',
  },
}));

const HeaderTabs = (Props: HeaderTabsProps) => {
  const { value, onChange } = Props;

  return (
    <Box sx={{ maxWidth: { xs: '95%', sm: 480 }, margin: '0 auto' }}>
      <Tabs
        value={value}
        onChange={onChange}
        textColor={'inherit'}
        indicatorColor='secondary'
        aria-label='main categories'
        variant='scrollable'
        scrollButtons='auto'
      >
        <StyledTab label='All' />
        <StyledTab label='New in' />
        <StyledTab label='Clothing' />
        <StyledTab label='Shoes' />
        <StyledTab label='Accessories' />
      </Tabs>
    </Box>
  );
};

export default HeaderTabs;
