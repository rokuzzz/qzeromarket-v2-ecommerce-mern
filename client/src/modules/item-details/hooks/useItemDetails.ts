import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../common/hooks/appHooks';
import { getProductByID } from '../../common/redux/productSlice';

const useItemDetails = () => {
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
    error,
  };
};

export default useItemDetails;
