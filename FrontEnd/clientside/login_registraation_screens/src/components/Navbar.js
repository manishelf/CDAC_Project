import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { isLoggedIn,removeToken } from '../utiles/auth'

const Navbar=()=>{
    const navigate= useNavigate()

    const handleLogout=()=>{
        removeToken();
        navigate("/login");
    }    

    return(
        <nav className='p-4 bg-blue-800 text-white'>
            <Link to="/" className='mr-4'>Home</Link>
            {
              isLoggedIn() ? (<button onClick={handleLogout} className='bg-red-500 px-4 py-2 round'>
                Logout
              </button>) :(
                <>
                <Link to="login" className='mr-4'>Login</Link>
                <Link to="register" className='mr-4'>Signup</Link>
                </>

              )
            }
        </nav>
    )

}

export default Navbar;

