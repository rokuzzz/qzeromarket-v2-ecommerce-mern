import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './utils/router/PrivateRoute';


function App() {

  return (
    <Routes>
      <Route path='/' element={<PrivateRoute />}>
        <Route path='/' element={<Home />}/>
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
