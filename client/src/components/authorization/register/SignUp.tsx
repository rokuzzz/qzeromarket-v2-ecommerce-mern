import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, useMediaQuery, useTheme } from '@mui/material';

import ParticlesBackground from '../../common/particles/ParticlesBackground';
import { useAppDispatch, useAppSelector } from '../../../hooks/common/appHooks';
import { loginByToken } from '../../../redux/slices/userSlice';
import RegisterForm from './RegisterForm';
import SignUpHeading from './SignUpHeading';
import {
  RegisterFormContainer,
  RegisterWrapper,
} from '../../../styles/register';
import useToken from '../../../hooks/common/useToken';
import useRegister from '../../../hooks/authorization/useRegister';

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
    <RegisterWrapper container justifyContent='center' alignItems='center'>
      <ParticlesBackground />
      <Grid item xs={10} sm={8} md={4}>
        <RegisterFormContainer
          sx={isDownSmall ? {} : { position: 'relative', zIndex: 3 }}
        >
          <SignUpHeading isDownSmall={isDownSmall} />
          <RegisterForm
            onSubmit={(e) => handleRegister(e)}
            formData={formData}
            onChange={onChange}
            isDownSmall={isDownSmall}
            isLoading={isLoading}
          />
        </RegisterFormContainer>
      </Grid>
    </RegisterWrapper>
  );
};

export default SignUp;
