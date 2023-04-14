import { Typography } from '@mui/material';

function SignUpHeading({ isDownSmall }: { isDownSmall: boolean }) {
  return (
    <>
      <Typography
        variant='h4'
        color={'text.primary'}
        sx={
          isDownSmall
            ? {
                fontWeight: 'bold',
                position: 'relative',
                zIndex: 3,
              }
            : { fontWeight: 'bold' }
        }
      >
        qzeromarket.
      </Typography>
      <Typography
        variant='subtitle1'
        color={'text.secondary'}
        sx={
          isDownSmall
            ? {
                lineHeight: 1.2,
                mt: 1,
                position: 'relative',
                zIndex: 3,
              }
            : { lineHeight: 1.2, mt: 1 }
        }
      >
        Enter all text fields to complete registration
      </Typography>
    </>
  );
}

export default SignUpHeading;
