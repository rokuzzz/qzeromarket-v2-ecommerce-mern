import { useEffect, useState } from "react";

import { ProductInCart } from "../types/cart";

interface UseCartQuantityProps {
  products: ProductInCart[] | undefined, 
  _id: string
}

const useCartQuantity = ({products, _id}: UseCartQuantityProps) => {
  const [cartQuantity, setCartQuantity] = useState<number>(
    products?.find((product) => product.productId._id === _id)?.quantity || 0
  );

  const currentQuantity = products?.find(
    (product) => product.productId._id === _id
  )?.quantity;

  useEffect(() => {
    let timeout: NodeJS.Timeout;;

    if (currentQuantity !== undefined && currentQuantity !== cartQuantity) {
      timeout = setTimeout(() => {
        setCartQuantity(currentQuantity);
      }, 800);
    }

    return () => clearTimeout(timeout);
  }, [currentQuantity]);
  return {
    cartQuantity, 
    setCartQuantity
  };
};

export default useCartQuantity;