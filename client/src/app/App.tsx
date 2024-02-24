import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from '../modules/common/utils/PrivateRoute';
import Store from '../modules/store/StorePage';
import ItemDetailsPage from '../modules/item-details/ItemDetails';
import Favorites from '../modules/favorites/FavoritesPage';
import SignIn from '../modules/auth/LoginPage';
import SignUp from '../modules/auth/RegisterPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Store />} />
          <Route path='/products/:productId' element={<ItemDetailsPage />} />
          <Route path='/favorites' element={<Favorites />} />
        </Route>
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
      </Routes>
      <ToastContainer limit={2} />
    </>
  );
}

export default App;
