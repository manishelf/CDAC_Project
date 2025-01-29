import { ToastContainer } from 'react-toastify';
import PaymentReciptScreen from './screens/PaymentReciptScreen';
import 'react-toastify/dist/ReactToastify.css';
import UserReviewScreen from './screens/UserReviewScreen';
import PaymentConfirmationScreen from './screens/PaymentConfirmationScreen';
import MapWithDirection from './components/MapWithDirection';

function App() {
  return (
    <>
    {/* <UserReviewScreen />
    <PaymentReciptScreen />
    <PaymentConfirmationScreen />
    <ToastContainer />
	*/}
	<div style={{height: '100vh', width: '100%'}}>
      <MapWithDirection 
      from='Neelaya society, Talegaon Dabhade, Pune, Maharashtra' 
      to='Sunbeam info tech, Pune, Maharashtra'
      />
    </div>
    </>
  );
}

export default App;
