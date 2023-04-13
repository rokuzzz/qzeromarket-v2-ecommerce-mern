import { Grid, Typography } from '@mui/material';

import { Product } from './../../types/products';

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <Grid container spacing={2} sx={{mt: 10}}>
      {products.map((product) => (
        <Grid item key={product._id}>
          <Typography>{product.title}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
