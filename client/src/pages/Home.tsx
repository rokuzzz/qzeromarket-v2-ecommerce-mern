import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/appHooks';
import { loginByToken } from '../redux/slices/userSlice';

const Home = () => {
  const { currentUser } = useAppSelector((state) => state.userReducer); // get curr user
  const dispatch = useAppDispatch();

  // get user data via login with access token (if token exists in local storage)
  useEffect(() => {
    dispatch(loginByToken(localStorage.getItem('access_token')));
  }, []);

  return <>{currentUser ? <div>Home</div> : <div>Go to login</div>}</>;
};

export default Home;
