import { useEffect, useState } from "react";

import { ProductInCart } from "../../types/cart";

interface UseCartQuantityProps {
  cartItems: ProductInCart[] | undefined, 
  _id: string
}

const useCartQuantity = ({cartItems, _id}: UseCartQuantityProps) => {
  const [cartQuantity, setCartQuantity] = useState<number>(
    cartItems?.find((cartItems) => cartItems.cartItemDetails._id === _id)?.quantity || 0
  );

  const currentQuantity = cartItems?.find(
    (item) => item.cartItemDetails._id === _id
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