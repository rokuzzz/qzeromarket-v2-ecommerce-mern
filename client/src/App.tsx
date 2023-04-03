import { Routes, Route } from 'react-router-dom';

import './App.css';
import PrivateRoute from './utils/router/PrivateRoute';
import Home from './pages/Home';
import EntryPage from './pages/EntryPage';


function App() {

  return (
    <Routes>
      <Route path='/' element={<PrivateRoute />}>
        <Route path='/' element={<Home />}/>
      </Route>
      <Route path='/login' element={<EntryPage />} />
    </Routes>
  );
}

export default App;
