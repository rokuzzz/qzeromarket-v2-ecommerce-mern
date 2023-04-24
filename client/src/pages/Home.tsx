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

  // Get a list of products depending on the selected category
  useEffect(() => {
    switch (selectedTab) {
      case 0:
        dispatch(fetchAllProducts({ categories: '&categories=All' }));
        break;
      case 1:
        dispatch(fetchAllProducts({ categories: '&categories=New' }));
        break;
      case 2:
        dispatch(fetchAllProducts({ categories: '&categories=Clothing' }));
        break;
      case 3:
        dispatch(fetchAllProducts({ categories: '&categories=Shoes' }));
        break;
      case 4:
        dispatch(fetchAllProducts({ categories: '&categories=Accessories' }));
        break;
    }
  }, [selectedTab, setSelectedTab]);

  // Get products list from productSlice initial state
  const { data, isLoading, error } = useAppSelector(
    (state) => state.productReducer.allProducts
  );

  return (
    <>
      <Header selectedTab={selectedTab} handleChange={handleTabChange} />
      <ProductList products={data} isLoading={isLoading} />
    </>
  );
};

export default Home;
