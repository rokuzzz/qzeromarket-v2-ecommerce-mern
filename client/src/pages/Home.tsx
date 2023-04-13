import { useEffect, useState } from 'react';
import { Toolbar } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../hooks/appHooks';
import { fetchAllProducts } from '../redux/slices/productSlice';
import Header from '../components/navigation/Header';
import ProductList from '../components/products/ProductList';

const Home = () => {
  const dispatch = useAppDispatch();

  // This state manages the selected tab index
  const [selectedTab, setSelectedTab] = useState(0);

  // This function is called when the user clicks on a tab and updates the selected tab index
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // Fetch all products on mount
  useEffect(() => {
    dispatch(fetchAllProducts({}));
  }, []);

   // Get all products from state
  const { allProducts } = useAppSelector((state) => state.productReducer);

  return (
    <>
      <Header selectedTab={selectedTab} handleChange={handleTabChange} />
      <Toolbar />
      <ProductList products={allProducts} />
    </>
  );
};

export default Home;
