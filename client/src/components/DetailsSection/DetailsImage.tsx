import { Product } from '../../types/products';
import { ImageWrapper } from '../../styles/detailsSection';
import { useEffect, useRef } from 'react';

interface ProductDetailsImageProps {
  styles: any;
  data?: Product;
  setAvailableHeight: React.Dispatch<React.SetStateAction<number>>;
}

const ProductDetailsImage = ({
  styles,
  data,
  setAvailableHeight,
}: ProductDetailsImageProps) => {
  const { imageUrl, title } = data || {};

  const imgRef = useRef<HTMLImageElement | null>(null);

  // const titleHeight = 68.3;
  // const priceHeight = 26.5;
  const buttonsHeight = 92.5;

  const updateHeight = () => {
    if (imgRef.current) {
      const imgHeight = imgRef.current.offsetHeight; // Get actual image height
      const availableHeight = imgHeight - (buttonsHeight + 30);
      setAvailableHeight(availableHeight);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      updateHeight();
    };

    if (imgRef.current) {
      imgRef.current.addEventListener('load', handleLoad);
    }

    return () => {
      if (imgRef.current) {
        imgRef.current.removeEventListener('load', handleLoad);
      }
    };
  }, [setAvailableHeight]);

  return (
    <ImageWrapper>
      <img ref={imgRef} style={styles.image} src={imageUrl} alt={title}></img>
    </ImageWrapper>
  );
};

export default ProductDetailsImage;
