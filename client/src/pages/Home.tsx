import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/appHooks';

import { fetchAllProducts } from '../redux/slices/productSlice';

const Home = () => {
  const { allProducts } = useAppSelector((state) => state.productReducer); // get curr user
  const dispatch = useAppDispatch();

  // get user data via login with access token (if token exists in local storage)
  useEffect(() => {
    dispatch(fetchAllProducts({}));
  }, []);

  return (
    <>
      {allProducts.map((product) => (
        <div>{product.title}</div>
      ))}
    </>
  );
};

export default Home;
