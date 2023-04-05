import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import ParticlesBackground from '../particles/ParticlesBackground';
import FormInput from './FormInput';
import { RegisterBox, RegisterWrapper } from '../../styles/register';
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';
import { loginByToken, register } from '../../redux/slices/userSlice';

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
    isAuthenticated && currentUser     // check if user is already authenticated -
      ? navigate('/')                  // go to home page
      : dispatch(loginByToken(token)); // otherwise try to login by token
  }, [isAuthenticated, currentUser]);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });

  const inputs = [
    {
      id: 'firstname-textfield',
      gridKey: 1,
      name: 'firstname',
      label: 'firstname',
      placeholder: 'John',
      isRequired: true,
    },
    {
      id: 'lastname-textfield',
      gridKey: 2,
      name: 'lastname',
      label: 'lastname',
      placeholder: 'Doe',
      isRequired: true,
    },
    {
      id: 'username-textfield',
      gridKey: 3,
      name: 'username',
      label: 'username',
      placeholder: 'johndoe',
      isRequired: true,
    },
    {
      id: 'email-textfield',
      gridKey: 4,
      name: 'email',
      label: 'email',
      placeholder: 'john.doe@email.com',
      isRequired: true,
      type: 'email',
    },
    {
      id: 'password-textfield',
      gridKey: 5,
      name: 'password',
      label: 'password',
      placeholder: '********',
      isRequired: true,
      type: 'password',
    },
  ];

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
            Enter all text fields to complete registration
          </Typography>
          <form onSubmit={(e) => handleRegister(e)}>
            <Grid
              container
              rowSpacing={1.1}
              sx={{ maxWidth: '280px', margin: '25px auto' }}
            >
              {inputs.map((input) => (
                <Grid item xs={12} key={input.gridKey}>
                  <FormInput
                    key={input.id}
                    {...input}
                    value={formData[input.name as keyof typeof formData]}
                    onChange={onChange}
                  />
                </Grid>
              ))}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  type='submit'
                  fullWidth
                  size='large'
                  color='primary'
                  variant='contained'
                  sx={{ mb: 1 }}
                >
                  Sign up
                </Button>
                <Typography
                  color={'text.secondary'}
                  sx={isDownSmall ? { position: 'relative', zIndex: 3 } : {}}
                >
                  Already have an account?&nbsp;{' '}
                  <Link to='/login' style={{ color: 'black' }}>
                    Sign in
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </RegisterBox>
      </Grid>
    </RegisterWrapper>
  );
};

export default SignUp;
