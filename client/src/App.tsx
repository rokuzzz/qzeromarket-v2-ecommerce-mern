import React, { useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/appHooks';
import Home from './pages/Home';
import Login from './pages/Login';
import { loginByToken } from './redux/slices/userSlice';

function App() {
  const {currentUser} = useAppSelector((state) => state.userReducer) // get curr user 
  const dispatch = useAppDispatch()

  // get user data via login with access token (if token exists in local storage)
  useEffect(() => {
    dispatch(loginByToken(localStorage.getItem('access_token')))
  }, [])

  return (
    <Routes>
      {currentUser 
      ? <Route path='/' element={<Home />} />
      : <Route path='/login' element={<Login />} />}
    </Routes>
  );
}

export default App;
