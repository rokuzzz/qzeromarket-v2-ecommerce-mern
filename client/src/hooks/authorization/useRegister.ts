import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../common/appHooks';
import { useState } from 'react';
import { register } from '../../redux/slices/userSlice';

const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useAppSelector((state) => state.userReducer);
  const { data, isLoading } = loggedInUser;

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
