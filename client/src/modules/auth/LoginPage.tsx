import { Grid, useMediaQuery, useTheme } from '@mui/material';

import useLogin from './hooks/useLogin';
import { AuthFormContainer, AuthWrapper } from '../../styles/auth';
import ParticlesBackground from '../common/components/particles/ParticlesBackground';
import AuthHeading from 'src/modules/auth/components/AuthHeading';
import { LoginForm } from './components/LoginForm';

const LoginPage = () => {
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
    <AuthWrapper container justifyContent='center' alignItems='center'>
      <ParticlesBackground />
      <Grid item xs={10} sm={8} md={4}>
        <AuthFormContainer
          sx={isDownSmall ? {} : { position: 'relative', zIndex: 3 }}
        >
          <AuthHeading
            isDownSmall={isDownSmall}
            subtitles={[
              'Hey! Enter your details to get',
              'sign in to your account :D',
            ]}
          />
          <LoginForm
            onSubmit={(e) => handleLogin(e)}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            isDownSmall={isDownSmall}
            isLoading={isLoading}
          />
        </AuthFormContainer>
      </Grid>
    </AuthWrapper>
  );
};

export default LoginPage;
