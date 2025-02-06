import MapWithDirection from "../components/MapWithDirection";
import Home from './../components/Home/Home';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { isLoggedIn } from "./auth/auth";

const HomeScreen = ()  => {
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoggedIn()) {
          navigate('/login');
      }
  }, [navigate]);
    
    return (
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
    );
}

export default HomeScreen;