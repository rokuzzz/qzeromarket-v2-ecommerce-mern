import { Tabs } from '@mui/material';
import React, { useState } from 'react';
import { StyledTab } from '../../styles/navigation';

interface HeaderTabsProps {
  value?: number;
  onChange?: (event: React.SyntheticEvent, newValue: number) => void;
}

const HeaderTabs = (Props: HeaderTabsProps) => {
  const { value, onChange } = Props;

  return (
    <Tabs
      value={value}
      onChange={onChange}
      textColor={'inherit'}
      indicatorColor='secondary'
      aria-label='main categories'
      sx={{
        margin: '0 auto',
      }}
    >
      <StyledTab label='All' />
      <StyledTab label='New in' />
      <StyledTab label='Clothing' />
      <StyledTab label='Shoes' />
      <StyledTab label='Accessories' />
    </Tabs>
  );
};

export default HeaderTabs;
