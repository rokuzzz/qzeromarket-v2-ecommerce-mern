import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../common/hooks/appHooks';
import { login, loginByToken } from '../redux/authSlice';

const useLogin = () => {
  const { loggedInUser } = useAppSelector((state) => state.authReducer);
  const { data, isLoading } = loggedInUser;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  return {
    handleLogin,
    username,
    setUsername,
    password,
    setPassword,
    isLoading,
  };
};

export default useLogin;
