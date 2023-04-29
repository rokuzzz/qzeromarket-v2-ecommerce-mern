import { Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import ParticlesBackground from '../../common/particles/ParticlesBackground';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/appHooks';
import { login, loginByToken } from '../../../redux/slices/userSlice';
import LoginForm from './LoginForm';
import SignInHeading from './SignInHeading';

const LoginWrapper = styled(Grid)(({ theme }) => ({
  height: '100vh',
  backgroundColor: theme.palette.background.default,
}));

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
  const { currentUser } = useAppSelector((state) => state.userReducer);
  const { data, isLoading } = currentUser;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const isDownSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const token = localStorage.getItem('access_token');
  useEffect(() => {
    if (data) {
      navigate('/');
    } else {
      dispatch(loginByToken(token));
    }
  }, [data]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
            isLoading={isLoading}
          />
        </LoginBox>
      </Grid>
    </LoginWrapper>
  );
};

export default SignIn;
