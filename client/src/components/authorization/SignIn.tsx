import React from 'react';
import { Button, Grid, Typography } from '@mui/material';

import { LoginBox, LoginWrapper } from '../../styles/login';
import FormInput from './FormInput';

const SignIn = () => {
  return (
    <LoginWrapper container justifyContent='center' alignItems='center'>
      <Grid item xs={10} sm={8} md={4}>
        <LoginBox>
          <Typography
            variant='h4'
            sx={{
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            Login
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              opacity: '90%',
              lineHeight: 1.2,
              mt: 1,
            }}
          >
            Hey! Enter your details to get
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              opacity: '90%',
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
                  label='username'
                  placeholder='Enter your username'
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  label='password'
                  placeholder='********'
                  isRequired={true}
                  type='password'
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Button type='submit' fullWidth variant='outlined'>
                  Sign in
                </Button>
              </Grid>
            </Grid>
          </form>
        </LoginBox>
      </Grid>
    </LoginWrapper>
  );
};

export default SignIn;
