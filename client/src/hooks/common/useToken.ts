import { useEffect, useState } from 'react';

const useToken = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token') || '';
    setToken(storedToken);
  }, []);

  return token;
};

export default useToken;
