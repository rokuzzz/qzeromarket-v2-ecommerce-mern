import React from 'react';
import ProductDetailsSkeleton from './DetailsSectionSkeleton';
import { DetailsSectionWrapper } from '../../styles/detailsSection';
import { Grid } from '@mui/material';
import ProductDetailsImage from './DetailsImage';
import ProductDetailsContent from './DetailsContent';
import { Product } from '../../types/products';

interface DetailsSectionProps {
  isLoading: boolean;
  styles: any;
  data?: Product;
  setAvailableHeight: React.Dispatch<React.SetStateAction<number>>;
}

const DetailsSection = ({
  isLoading,
  styles,
  data,
  setAvailableHeight,
}: DetailsSectionProps) => {
  return isLoading ? (
    <ProductDetailsSkeleton styles={styles} />
  ) : (
    <DetailsSectionWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <ProductDetailsImage
            styles={styles}
            data={data}
            setAvailableHeight={setAvailableHeight}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <ProductDetailsContent styles={styles} data={data} />
        </Grid>
      </Grid>
    </DetailsSectionWrapper>
  );
};

export default DetailsSection;
