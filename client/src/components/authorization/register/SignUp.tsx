import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

import ParticlesBackground from '../../common/particles/ParticlesBackground';
import { useAppDispatch, useAppSelector } from '../../../hooks/appHooks';
import { loginByToken, register } from '../../../redux/slices/userSlice';
import RegisterForm from './RegisterForm';
import SignUpHeading from './SignUpHeading';

const RegisterWrapper = styled(Grid)(({ theme }) => ({
  height: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const RegisterBox = styled(Paper)(({ theme }) => ({
  boxSizing: 'border-box',
  padding: theme.spacing(10, 0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
  [theme.breakpoints.down('sm')]: {
    boxShadow: 'none',
  },
}));

const SignUp = () => {
  const { isAuthenticated, currentUser } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const isDownSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  useEffect(() => {
    isAuthenticated && currentUser // check if user is already authenticated -
      ? navigate('/') // go to home page
      : dispatch(loginByToken(token)); // otherwise try to login by token
  }, [isAuthenticated, currentUser]);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(register(formData));

    if (currentUser) navigate('/login');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <RegisterWrapper container justifyContent='center' alignItems='center'>
      <ParticlesBackground />
      <Grid item xs={10} sm={8} md={4}>
        <RegisterBox
          sx={isDownSmall ? {} : { position: 'relative', zIndex: 3 }}
        >
          <SignUpHeading isDownSmall={isDownSmall} />
          <RegisterForm
            onSubmit={(e) => handleRegister(e)}
            formData={formData}
            onChange={onChange}
            isDownSmall={isDownSmall}
          />
        </RegisterBox>
      </Grid>
    </RegisterWrapper>
  );
};

export default SignUp;
