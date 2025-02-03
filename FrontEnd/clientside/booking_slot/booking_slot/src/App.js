import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Booknow from './component/Booknow';
import Booklater from './component/Booklater';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './component/Navbar/Navbar'
import MapWithDirection from './component/MapWithDirection';


function App() {
  return (
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/booknow' element={
          <div className='container-fluid row'>
             <div className='col'>
              <Booknow/>
             </div>
             <div className='col' style={{height:'100vh'}}>
              <MapWithDirection from="Pune" to="Mumbai" />
             </div>
          </div>
          }/>
        <Route path='/booklater' element={
          <div className='container-fluid row'>
             <div className='col'>
              <Booklater/>
             </div>
             <div className='col' style={{height:'100vh'}}>
              <MapWithDirection from="Pune" to="Mumbai" />
             </div>
          </div>
        }/>
      </Routes>
      </BrowserRouter>
)
}

export default App;
