import { Box, Tab, TabScrollButton, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

interface HeaderTabsProps {
  value?: number;
  onChange?: (event: React.SyntheticEvent, newValue: number) => void;
  isUpMd: boolean;
  isDownSm: boolean;
}

const StyledTab = styled(Tab)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: '180px',
  },
}));

const HeaderTabs = ({ value, onChange, isUpMd, isDownSm }: HeaderTabsProps) => {
  return (
    <Box
      sx={{
        maxWidth: '100%',
        margin: isDownSm ? '0 16px' : isUpMd ? '0 8px' : '0px',
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
        <StyledTab label='Bestsellers' />
        <StyledTab label='Clothing' />
        <StyledTab label='Shoes' />
        <StyledTab label='Accessories' />
        <StyledTab label='Denim' />
        <StyledTab label='Sportswear' />
      </Tabs>
    </Box>
  );
};

export default HeaderTabs;
