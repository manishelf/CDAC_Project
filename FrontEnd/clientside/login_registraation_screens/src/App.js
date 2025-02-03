import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SignUp from './components/Signup';
import Login from './components/Login';
import { isLoggedIn } from './utiles/auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={isLoggedIn() ? <Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
