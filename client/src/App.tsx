import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './utils/router/PrivateRoute';
import Home from './pages/Home';
import EntryPage from './pages/EntryPage';
import SignUp from './components/authorization/register/SignUp';
import ProductDetails from './pages/ProductDetails';
import Favorites from './pages/Favorites';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/products/:productId' element={<ProductDetails />} />
          <Route path='/favorites' element={<Favorites />} />
        </Route>
        <Route path='/login' element={<EntryPage />} />
        <Route path='/register' element={<SignUp />} />
      </Routes>
      <ToastContainer limit={2} />
    </>
  );
}

export default App;
