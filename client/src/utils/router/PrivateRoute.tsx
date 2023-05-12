import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/common/appHooks';

const PrivateRoute = () => {
  // Get the isAuthenticated value from the userReducer state
  const { loggedInUser } = useAppSelector((state) => state.userReducer);

  // If authenticated, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return loggedInUser.data ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
