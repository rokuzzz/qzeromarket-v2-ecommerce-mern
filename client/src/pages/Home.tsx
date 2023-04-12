import { useEffect } from 'react';
import { Toolbar } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../hooks/appHooks';
import { fetchAllProducts } from '../redux/slices/productSlice';
import Header from '../components/navigation/Header';

const Home = () => {
  const { allProducts } = useAppSelector((state) => state.productReducer); // get curr user
  const dispatch = useAppDispatch();

  // get user data via login with access token (if token exists in local storage)
  useEffect(() => {
    dispatch(fetchAllProducts({}));
  }, []);

  return (
    <>
      <Header />
      <Toolbar />
      {allProducts.map((product) => (
        <div>{product.title}</div>
      ))}
    </>
  );
};

export default Home;
