import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/appHooks';
import { useEffect } from 'react';
import { getProductByID } from '../redux/slices/productSlice';

const ProductDetails = () => {
  const dispatch = useAppDispatch();

  const { productId } = useParams();
  useEffect(() => {
    dispatch(getProductByID(productId));
  }, [productId]);

  const { currentProduct } = useAppSelector((state) => state.productReducer);
  return <div>{currentProduct?.title}</div>;
};

export default ProductDetails;
