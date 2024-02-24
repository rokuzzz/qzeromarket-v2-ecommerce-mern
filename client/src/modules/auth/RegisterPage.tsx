import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../common/hooks/appHooks';
import useToken from '../common/hooks/useToken';
import useRegister from './hooks/useRegister';
import { loginByToken } from 'src/modules/auth/redux/authSlice';
import { AuthFormContainer, AuthWrapper } from '../../styles/auth';
import ParticlesBackground from '../common/components/particles/ParticlesBackground';
import AuthHeading from 'src/modules/auth/components/AuthHeading';
import { RegisterForm } from 'src/modules/auth/components/RegisterForm';

const RegisterPage = () => {
  const theme = useTheme();
  const isDownSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useToken();

  const { data, isLoading } = useAppSelector(
    (state) => state.authReducer.loggedInUser
  );

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

export default RegisterPage;
