import { useEffect, useState } from 'react';
import { Toolbar } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../hooks/appHooks';
import { fetchAllProducts } from '../redux/slices/productSlice';
import Header from '../components/navigation/Header';

const Home = () => {
  const { allProducts } = useAppSelector((state) => state.productReducer); // get curr user
  const dispatch = useAppDispatch();

  // This state manages the selected tab index
  const [selectedTab, setSelectedTab] = useState(0);

  // This function is called when the user clicks on a tab and updates the selected tab index
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // get user data via login with access token (if token exists in local storage)
  useEffect(() => {
    dispatch(fetchAllProducts({}));
  }, []);

  return (
    <>
      <Header selectedTab={selectedTab} handleChange={handleTabChange} />
      <Toolbar />
      {allProducts.map((product) => (
        <div>{product.title}</div>
      ))}
    </>
  );
};

export default Home;
