import { Typography } from '@mui/material';

interface SignInHeadingProps {
  isDownSmall: boolean;
}

const SignInHeading = ({ isDownSmall }: SignInHeadingProps) => {
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
        Hey! Enter your details to get
      </Typography>
      <Typography
        variant='subtitle1'
        color={'text.secondary'}
        sx={
          isDownSmall
            ? {
                lineHeight: 1.2,
                position: 'relative',
                zIndex: 3,
              }
            : { lineHeight: 1.2 }
        }
        gutterBottom
      >
        sign in to your account :D
      </Typography>
    </>
  );
};

export default SignInHeading;
