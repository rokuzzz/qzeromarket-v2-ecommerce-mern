import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/common/appHooks';
import { fetchFilteredProducts } from '../redux/slices/productSlice';
import Header from '../components/navigation/Header';
import ProductList from '../components/products/ProductList';
import Footer from '../components/navigation/Footer';

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
          fetchFilteredProducts({
            categories: '&categories=All',
            limit: '&limit=100',
          })
        );
        break;
      case 1:
        dispatch(
          fetchFilteredProducts({
            categories: '&categories=New',
            limit: '&limit=100',
          })
        );
        break;
      case 2:
        dispatch(
          fetchFilteredProducts({
            categories: '&categories=Bestsellers',
            limit: '&limit=100',
          })
        );
        break;
      case 3:
        dispatch(
          fetchFilteredProducts({
            categories: '&categories=Clothing',
            limit: '&limit=100',
          })
        );
        break;
      case 4:
        dispatch(
          fetchFilteredProducts({
            categories: '&categories=Shoes',
            limit: '&limit=100',
          })
        );
        break;
      case 5:
        dispatch(
          fetchFilteredProducts({
            categories: '&categories=Accessories',
            limit: '&limit=100',
          })
        );
        break;
      case 6:
        dispatch(
          fetchFilteredProducts({
            categories: '&categories=Denim',
            limit: '&limit=100',
          })
        );
        break;
      case 7:
        dispatch(
          fetchFilteredProducts({
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
      <Footer />
    </>
  );
};

export default Home;
