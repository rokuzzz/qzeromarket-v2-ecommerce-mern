import { Box, Tab, TabScrollButton, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

interface HeaderTabsProps {
  value?: number;
  onChange?: (event: React.SyntheticEvent, newValue: number) => void;
  isDownMd: boolean;
}

const StyledTab = styled(Tab)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: '125px',
  },
}));

const HeaderTabs = ({ value, onChange, isDownMd }: HeaderTabsProps) => {
  return (
    <Box
      sx={{
        maxWidth: '100%',
        margin: isDownMd ? '0 16px' : '0 48px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
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
