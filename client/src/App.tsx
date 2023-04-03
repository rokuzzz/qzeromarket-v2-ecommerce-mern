import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './utils/router/PrivateRoute';
import Home from './pages/Home';
import EntryPage from './pages/EntryPage';
import SignUp from './components/authorization/SignUp';
import ParticlesBackground from './components/particles/ParticlesBackground';


function App() {

  return (
    <Routes>
      <Route path='/' element={<PrivateRoute />}>
        <Route path='/' element={<Home />}/>
      </Route>
      <Route path='/login' element={<EntryPage />} />
      <Route path='/register' element={<SignUp />} />
    </Routes>
  );
}

export default App;
