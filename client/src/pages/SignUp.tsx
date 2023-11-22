import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/common/appHooks';
import useToken from '../hooks/common/useToken';
import useRegister from '../hooks/authorization/useRegister';
import { loginByToken } from '../redux/slices/userSlice';
import { AuthFormContainer, AuthWrapper } from '../styles/auth';
import ParticlesBackground from '../components/common/particles/ParticlesBackground';
import AuthHeading from '../components/authorization/common/AuthHeading';
import RegisterForm from '../components/authorization/register/RegisterForm';

const SignUp = () => {
  const theme = useTheme();
  const isDownSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useToken();

  const { loggedInUser } = useAppSelector((state) => state.userReducer);
  const { data, isLoading } = loggedInUser;

  const { formData, onChange, handleRegister } = useRegister();

  useEffect(() => {
    if (data) {
      navigate('/');
    } else {
      dispatch(loginByToken(token));
    }
  }, [data]);

  return (
    <AuthWrapper container justifyContent='center' alignItems='center'>
      <ParticlesBackground />
      <Grid item xs={10} sm={8} md={4}>
        <AuthFormContainer
          sx={isDownSmall ? {} : { position: 'relative', zIndex: 3 }}
        >
          <AuthHeading
            isDownSmall={isDownSmall}
            subtitles={['Enter all text fields to complete registration']}
          />
          <RegisterForm
            onSubmit={(e) => handleRegister(e)}
            formData={formData}
            onChange={onChange}
            isDownSmall={isDownSmall}
            isLoading={isLoading}
          />
        </AuthFormContainer>
      </Grid>
    </AuthWrapper>
  );
};

export default SignUp;
