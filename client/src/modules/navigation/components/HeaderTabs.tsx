import { Box, Tabs } from '@mui/material';

import { StyledTab } from '../styles/headerStyles';

interface HeaderTabsProps {
  value?: number;
  onChange?: (event: React.SyntheticEvent, newValue: number) => void;
  isUpMd: boolean;
  isDownSm: boolean;
}

const HeaderTabs = ({ value, onChange, isUpMd, isDownSm }: HeaderTabsProps) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#0B1215',
        overflow: 'hidden',
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
