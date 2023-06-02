import React from 'react';
import { Toolbar } from '@mui/material';

import Header from '../components/navigation/Header';

const Favorites = () => {
  return (
    <>
      <Header />
      <Toolbar sx={{ height: '60px' }} />
    </>
  );
};

export default Favorites;
