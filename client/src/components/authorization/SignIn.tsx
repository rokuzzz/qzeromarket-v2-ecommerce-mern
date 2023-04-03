import { Button, Grid, Typography } from '@mui/material';

import { LoginBox, LoginWrapper } from '../../styles/login';
import FormInput from './FormInput';
import { Link } from 'react-router-dom';
import ParticlesBackground from '../particles/ParticlesBackground';

const SignIn = () => {
  return (
    <LoginWrapper container justifyContent='center' alignItems='center'>
      <ParticlesBackground />
      <Grid item xs={10} sm={8} md={4}>
        <LoginBox sx={{ position: 'relative', zIndex: 3 }}>
          <Typography
            variant='h4'
            sx={{
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            qzeromarket.
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              lineHeight: 1.2,
              mt: 1,
            }}
          >
            Hey! Enter your details to get
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              lineHeight: 1.2,
            }}
            gutterBottom
          >
            sign in to your account :D
          </Typography>
          <form>
            <Grid
              container
              rowSpacing={1.5}
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
                <Typography>
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
