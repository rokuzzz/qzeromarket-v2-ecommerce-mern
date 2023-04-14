import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

import ParticlesBackground from '../../common/particles/ParticlesBackground';
import { useAppDispatch, useAppSelector } from '../../../hooks/appHooks';
import { loginByToken, register } from '../../../redux/slices/userSlice';
import RegisterForm from './RegisterForm';
import SignUpHeading from './SignUpHeading';

// Styling the components with MUI styles
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
  // Define appHooks
  const { isAuthenticated, currentUser } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  // Get theme and screen size information from MUI
  const theme = useTheme();
  const isDownSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // Get user token from local storage and attempt to log in if user is not already authenticated
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

  // Define state for form data and functions to handle form input and submission
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });
  // Event handler for form submission
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
