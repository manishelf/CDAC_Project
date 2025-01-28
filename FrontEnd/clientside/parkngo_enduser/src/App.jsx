import { ToastContainer } from 'react-toastify';
import PaymentReciptScreen from './screens/PaymentReciptScreen';
import 'react-toastify/dist/ReactToastify.css';
import UserReviewScreen from './screens/UserReviewScreen';
import PaymentConfirmationScreen from './screens/PaymentConfirmationScreen';

function App() {
  return (
    <>
    {/* <UserReviewScreen />
    <PaymentReciptScreen /> */}
    <PaymentConfirmationScreen />
    <ToastContainer />
    </>
  );
}

export default App;
