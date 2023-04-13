import {
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import ParticlesBackground from '../../common/particles/ParticlesBackground';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/appHooks';
import { login, loginByToken } from '../../../redux/slices/userSlice';
import LoginForm from './LoginForm';
import SignInHeading from './SignInHeading';

// Wrapper component for the entire login page
const LoginWrapper = styled(Grid)(({ theme }) => ({
  height: '100vh',
  backgroundColor: theme.palette.background.default,
}));

// Styled component for the login form box
const LoginBox = styled(Paper)(({ theme }) => ({
  boxSizing: 'border-box',
  padding: theme.spacing(10, 0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
  [theme.breakpoints.down('sm')]: {
    boxShadow: 'none',
  },
}));

const SignIn = () => {
  // Hooks
  const { isAuthenticated, currentUser } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  // Get the current screen size
  const isDownSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const token = localStorage.getItem('access_token');
  // Check if user is already authenticated or try to login by token
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      // User is authenticated, go to home page
      navigate('/');
    } else {
      // Try to log in by token
      dispatch(loginByToken(token));
    }
  }, [isAuthenticated, currentUser]);

  // State variables for the username and password fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Event handler for form submission
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Dispatch the login action with the entered username and password
    dispatch(login({ username, password }));
  };

  return (
    <LoginWrapper container justifyContent='center' alignItems='center'>
      <ParticlesBackground />
      <Grid item xs={10} sm={8} md={4}>
        <LoginBox sx={isDownSmall ? {} : { position: 'relative', zIndex: 3 }}>
          <SignInHeading isDownSmall={isDownSmall} />
          <LoginForm
            onSubmit={(e) => handleLogin(e)}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            isDownSmall={isDownSmall}
          />
        </LoginBox>
      </Grid>
    </LoginWrapper>
  );
};

export default SignIn;
