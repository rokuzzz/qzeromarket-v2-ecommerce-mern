import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { LoginBox, LoginWrapper } from '../../styles/login';
import FormInput from './FormInput';
import ParticlesBackground from '../particles/ParticlesBackground';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';
import { login, loginByToken } from '../../redux/slices/userSlice';

const SignIn = () => {
  const { isAuthenticated } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const isDownSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  useEffect(() => {
    isAuthenticated                    // check if user is already authenticated -
      ? navigate('/')                  // go to home page
      : dispatch(loginByToken(token)); // otherwise try to login by token
  }, [isAuthenticated]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(
      login({
        username: username,
        password: password,
      })
    );
  };

  return (
    <LoginWrapper container justifyContent='center' alignItems='center'>
      <ParticlesBackground />
      <Grid item xs={10} sm={8} md={4}>
        <LoginBox sx={isDownSmall ? {} : { position: 'relative', zIndex: 3 }}>
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
          <form onSubmit={(e) => handleSubmit(e)}>
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
                <Button
                  type='submit'
                  fullWidth
                  size='large'
                  color='primary'
                  variant='contained'
                  sx={{ mb: 1 }}
                >
                  Sign in
                </Button>
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
        </LoginBox>
      </Grid>
    </LoginWrapper>
  );
};

export default SignIn;
