import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { AuthSubmitButton } from './AuthSubmitButton';
import { FormInput } from './FormInput';

interface LoginFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  username: string;
  setUsername: (value: React.SetStateAction<string>) => void;
  password: string;
  setPassword: (value: React.SetStateAction<string>) => void;
  isDownSmall: boolean;
  isLoading: boolean;
}

export const LoginForm = ({
  onSubmit,
  username,
  setUsername,
  password,
  setPassword,
  isDownSmall,
  isLoading,
}: LoginFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <Grid
        container
        rowSpacing={1.1}
        sx={{ maxWidth: '280px', margin: '25px auto' }}
      >
        <Grid item xs={12}>
          <FormInput
            id='username-textfield'
            label='username'
            placeholder='Enter your username'
            value={username}
            isRequired={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            id='password-textfield'
            value={password}
            label='password'
            placeholder='********'
            isRequired={true}
            type='password'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <AuthSubmitButton isLoading={isLoading} buttonText='Sign in' />
          <Typography
            color={'text.secondary'}
            sx={isDownSmall ? { position: 'relative', zIndex: 3 } : {}}
          >
            Don't have an account?&nbsp;{' '}
            <Link to='/register' style={{ color: 'black' }}>
              Sign up
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};
