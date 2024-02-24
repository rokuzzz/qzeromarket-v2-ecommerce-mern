import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../common/hooks/appHooks';
import { useState } from 'react';
import { register } from '../redux/authSlice';

const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useAppSelector((state) => state.authReducer.loggedInUser);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(formData));
    if (data) navigate('/login');
  };

  return { formData, onChange, handleRegister };
};

export default useRegister;
