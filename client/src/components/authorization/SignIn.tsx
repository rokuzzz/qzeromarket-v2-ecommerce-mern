import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { LoginBox, LoginWrapper } from '../../styles/login';
import FormInput from './FormInput';
import ParticlesBackground from '../particles/ParticlesBackground';

const SignIn = () => {
  const theme = useTheme();
  const isDownSmall = useMediaQuery(theme.breakpoints.down('sm'));

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
          <form>
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
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  id='password-textfield'
                  label='password'
                  placeholder='********'
                  isRequired={true}
                  type='password'
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  type='submit'
                  fullWidth
                  color='primary'
                  variant='outlined'
                  sx={{ mb: 1 }}
                >
                  Sign in
                </Button>
                <Typography
                  color={'text.secondary'}
                  sx={isDownSmall ? { position: 'relative', zIndex: 3 } : {}}
                >
                  Don't have an account?&nbsp;{' '}
                  <Link to='/register' style={{ color: 'text.primary' }}>
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
