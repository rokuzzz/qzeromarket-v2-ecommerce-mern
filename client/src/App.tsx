import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './utils/router/PrivateRoute';
import Home from './pages/Home';
import EntryPage from './pages/EntryPage';
import SignUp from './components/authorization/register/SignUp';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='/login' element={<EntryPage />} />
        <Route path='/register' element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
