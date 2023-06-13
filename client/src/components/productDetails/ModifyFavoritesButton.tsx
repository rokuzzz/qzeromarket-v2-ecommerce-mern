import { Box, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface ModifyFavoritesButtonProps {
  handleModifyFavorites: () => void;
  isInFavorites: boolean;
}

const ModifyFavoritesButton = ({
  handleModifyFavorites,
  isInFavorites,
}: ModifyFavoritesButtonProps) => {
  return (
    <Button
      variant='outlined'
      color='primary'
      size='large'
      fullWidth
      onClick={handleModifyFavorites}
    >
      Add to Favorites
      <Box ml={1} display='flex' alignItems='center'>
        {isInFavorites ? (
          <FavoriteIcon fontSize='small' />
        ) : (
          <FavoriteBorderIcon fontSize='small' />
        )}
      </Box>
    </Button>
  );
};

export default ModifyFavoritesButton;
