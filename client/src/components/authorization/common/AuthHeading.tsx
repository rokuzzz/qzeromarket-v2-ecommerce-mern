import { Typography } from '@mui/material';

interface AuthHeadingProps {
  isDownSmall: boolean;
  subtitles: string[];
}

const AuthHeading = ({ isDownSmall, subtitles }: AuthHeadingProps) => {
  const commonStyles = {
    position: 'relative',
    zIndex: isDownSmall ? 3 : 'auto',
  };

  return (
    <>
      <Typography
        variant='h4'
        color={'text.primary'}
        sx={{ fontWeight: 'bold', ...commonStyles }}
      >
        qzeromarket.
      </Typography>
      {subtitles.map((subtitle, index) => (
        <Typography
          key={index}
          variant='subtitle1'
          color='text.secondary'
          sx={{
            lineHeight: 1.2,
            mt: index === 0 ? 1 : 0,
            position: 'relative',
            zIndex: isDownSmall ? 3 : 'auto',
          }}
        >
          {subtitle}
        </Typography>
      ))}
    </>
  );
};

export default AuthHeading;
