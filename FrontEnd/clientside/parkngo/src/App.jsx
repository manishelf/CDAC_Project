import { ToastContainer } from 'react-toastify';
import PaymentReciptScreen from './screens/PaymentReciptScreen';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <PaymentReciptScreen />
      <ToastContainer />
    </>
  );
}

export default App;
