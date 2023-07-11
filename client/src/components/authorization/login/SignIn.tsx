import { Grid, useMediaQuery, useTheme } from '@mui/material';

import ParticlesBackground from '../../common/particles/ParticlesBackground';
import LoginForm from './LoginForm';
import SignInHeading from './SignInHeading';
import useLogin from '../../../hooks/authorization/useLogin';
import { LoginFormContainer, LoginWrapper } from '../../../styles/login';

const SignIn = () => {
  const theme = useTheme();
  const isDownSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    handleLogin,
    username,
    setUsername,
    password,
    setPassword,
    isLoading,
  } = useLogin();

  return (
    <LoginWrapper container justifyContent='center' alignItems='center'>
      <ParticlesBackground />
      <Grid item xs={10} sm={8} md={4}>
        <LoginFormContainer
          sx={isDownSmall ? {} : { position: 'relative', zIndex: 3 }}
        >
          <SignInHeading isDownSmall={isDownSmall} />
          <LoginForm
            onSubmit={(e) => handleLogin(e)}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            isDownSmall={isDownSmall}
            isLoading={isLoading}
          />
        </LoginFormContainer>
      </Grid>
    </LoginWrapper>
  );
};

export default SignIn;
