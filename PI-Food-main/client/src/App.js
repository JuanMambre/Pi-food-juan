import { Route, Routes } from 'react-router-dom';
import Landing from './componentes/Landing/landingPage';
import HomePage from './componentes/Home/HomePage';
import Detail from './componentes/Detail/Detail';
import Create from './componentes/Create/Create';

import './App.css';

function App() {
  return (
    //search bar en /home
    <Routes>
      <Route
        path='/'
        element={<Landing />}
      />
      <Route
        path='/home'
        element={<HomePage />}
      />
      <Route
        path='/detail/:id'
        element={<Detail />}
      />
      <Route
        path='/create'
        element={<Create />}
      />
    </Routes>
  );
}

export default App;
