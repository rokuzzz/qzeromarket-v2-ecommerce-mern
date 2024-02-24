import { Link } from 'react-router-dom';

import { StyledRecommendationListItem } from '../../../styles/favorites';
import { Product } from '../../common/types/productTypes';
import { ImageListItemBar } from '@mui/material';

interface FeaturedCardProps {
  data: Product[];
  item: Product;
  index: number;
}

const FeaturedCard = ({ data, item, index }: FeaturedCardProps) => {
  return (
    <StyledRecommendationListItem
      key={index}
      sx={{
        width: { xs: '65%', sm: '40%', md: '27%' },
        marginLeft: {
          xs: index === 0 ? '8px' : '0.1rem',
          sm: index === 0 ? '16px' : '0.1rem',
          md: index === 0 ? '48px' : '0.25rem',
        },
        marginRight: {
          xs: index === data.length - 1 ? '8px' : '0.1rem',
          sm: index === data.length - 1 ? '16px' : '0.1rem',
          md: index === data.length - 1 ? '48px' : '0.25rem',
        },
      }}
    >
      <Link to={`/products/${item._id}`}>
        <img src={item.imageUrl} alt={item.title} style={{ width: '100%' }} />
      </Link>
      <ImageListItemBar
        title={item.title}
        subtitle={<span>price in eur: {item.price}.00</span>}
        position='below'
        sx={{ alignSelf: 'start', padding: '0 12px' }}
      />
    </StyledRecommendationListItem>
  );
};

export default FeaturedCard;
