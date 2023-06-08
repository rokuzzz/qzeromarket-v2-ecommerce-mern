import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import emptyCartGif from '../../assets/emptyCartGif.gif';

interface EmptyCartContentProps {
  setCartIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmptyCartContent = ({ setCartIsOpen }: EmptyCartContentProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '92%',
        margin: 'auto 0'
      }}
    >
      <img
        src={emptyCartGif}
        style={{ width: '100%', marginTop: '0px' }}
        alt='Empty Cart'
      />
      <Link
        to='/'
        onClick={() => setCartIsOpen(false)}
        style={{
          marginTop: '16px',
          color: 'inherit',
        }}
      >
        <Typography variant='button'>Your cart is empty. Shop now →</Typography>
      </Link>
    </Box>
  );
};

export default EmptyCartContent;
