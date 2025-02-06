import AdminHomeScreen from "./screens/AdminHomeScreen/AdminHomeScreen";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './screens/auth/Login';


import { useNavigate } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <div className='container-fluid bg-secondary' style={{height: '1rem'}} />
      <Routes>
        <Route path='/' element={<AdminHomeScreen />} />
        <Route path='/home' element={<AdminHomeScreen />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Login logout={true}/>} />
      </Routes>
      <div className='container-fluid bg-secondary' style={{height: '1rem'}} />
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
