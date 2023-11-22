import { Button } from '@mui/material';

interface AuthSubmitButtonProps {
  isLoading: boolean;
  buttonText: string;
}

const AuthSubmitButton = ({ isLoading, buttonText }: AuthSubmitButtonProps) => {
  return (
    <Button
      type='submit'
      fullWidth
      size='large'
      color='primary'
      variant='contained'
      disabled={isLoading ? true : false}
      sx={{ mb: 1 }}
    >
      {buttonText}
    </Button>
  );
};

export default AuthSubmitButton;
