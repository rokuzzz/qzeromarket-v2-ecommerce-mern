import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/appHooks';
import { getProductByID } from '../redux/slices/productSlice';

const useProductDetails = () => {
  const { data, isLoading, error } = useAppSelector(
    (state) => state.productReducer.currentProduct
  );

  const dispatch = useAppDispatch();

  const { productId } = useParams();

  useEffect(() => {
    dispatch(getProductByID(productId));
  }, [dispatch, productId]);

  return {
    data,
    isLoading,
    error
  };
};

export default useProductDetails;