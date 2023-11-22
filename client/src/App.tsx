import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './utils/router/PrivateRoute';
import Store from './pages/Store';
import ItemDetailsPage from './pages/ItemDetailsPage';
import Favorites from './pages/Favorites';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

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
