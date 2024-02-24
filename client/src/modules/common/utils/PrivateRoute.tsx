import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/appHooks';

const PrivateRoute = () => {
  // Get the isAuthenticated value from the authReducer state
  const { data } = useAppSelector((state) => state.authReducer.loggedInUser);

  // If authenticated, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return data ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
