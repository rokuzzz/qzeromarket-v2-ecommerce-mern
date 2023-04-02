import React from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import FormInput from '../components/FormInput';

const Login = () => {
  const LoginWrapper = styled(Grid)(({ theme }) => ({
    height: '100vh',
    backgroundColor: theme.palette.background.default,
  }));

  const LoginBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <LoginWrapper container justifyContent='center' alignItems='center'>
      <Grid item xs={10} sm={8} md={4}>
        <LoginBox>
          <Typography variant='h4' gutterBottom>
            Login
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormInput label='username' />
              </Grid>
              <Grid item xs={12}>
                <FormInput label='password' />
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' fullWidth variant='contained'>
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </LoginBox>
      </Grid>
    </LoginWrapper>
  );
};

export default Login;
