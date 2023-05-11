import { useEffect, useState } from 'react';
import { Toolbar } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../hooks/appHooks';
import { fetchAllProducts } from '../redux/slices/productSlice';
import Header from '../components/navigation/Header';
import ProductList from '../components/products/ProductList';

const Home = () => {
  const { data, isLoading } = useAppSelector(
    (state) => state.productReducer.allProducts
  );
  const dispatch = useAppDispatch();

  // This state manages the selected tab index
  const [selectedTab, setSelectedTab] = useState(0);

  // This function is called when the user clicks on a tab and updates the selected tab index
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    switch (selectedTab) {
      case 0:
        dispatch(
          fetchAllProducts({
            categories: '&categories=All',
            limit: '&limit=100',
          })
        );
        break;
      case 1:
        dispatch(
          fetchAllProducts({
            categories: '&categories=New',
            limit: '&limit=100',
          })
        );
        break;
      case 2:
        dispatch(
          fetchAllProducts({
            categories: '&categories=Bestsellers',
            limit: '&limit=100',
          })
        );
        break;
      case 3:
        dispatch(
          fetchAllProducts({
            categories: '&categories=Clothing',
            limit: '&limit=100',
          })
        );
        break;
      case 4:
        dispatch(
          fetchAllProducts({
            categories: '&categories=Shoes',
            limit: '&limit=100',
          })
        );
        break;
      case 5:
        dispatch(
          fetchAllProducts({
            categories: '&categories=Accessories',
            limit: '&limit=100',
          })
        );
        break;
      case 6:
        dispatch(
          fetchAllProducts({
            categories: '&categories=Denim',
            limit: '&limit=100',
          })
        );
        break;
      case 7:
        dispatch(
          fetchAllProducts({
            categories: '&categories=Sportswear',
            limit: '&limit=100',
          })
        );
        break;
    }
  }, [selectedTab, setSelectedTab]);

  return (
    <>
      <Header selectedTab={selectedTab} handleTabChange={handleTabChange} />
      <ProductList products={data} isLoading={isLoading} />
    </>
  );
};

export default Home;
