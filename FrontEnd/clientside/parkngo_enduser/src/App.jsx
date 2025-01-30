import { ToastContainer } from 'react-toastify';
import PaymentReciptScreen from './screens/PaymentReciptScreen';
import 'react-toastify/dist/ReactToastify.css';
import UserReviewScreen from './screens/UserReviewScreen';
import PaymentConfirmationScreen from './screens/PaymentConfirmationScreen';
import MapWithDirection from './components/MapWithDirection';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home'

function App() {
  return (
    <>
    {/* <UserReviewScreen />
    <PaymentReciptScreen />
    <PaymentConfirmationScreen />
    <ToastContainer />
	*/}
    <Navbar />
    <div className='container-fluid bg-secondary' style={{height: '1rem'}} />
	  <div className='row'>
      <div className='col'>
        <Home />
      </div>
      <div className='col-5' style={{height: '100vh'}}>
        <MapWithDirection 
        from='Neelaya society, Talegaon Dabhade, Pune, Maharashtra' 
        to='Sunbeam info tech, Pune, Maharashtra'
        />
      </div>
    </div>
    <div className='container-fluid bg-secondary' style={{height: '1rem'}} />
    <Footer />
    </>
  );
}

export default App;
