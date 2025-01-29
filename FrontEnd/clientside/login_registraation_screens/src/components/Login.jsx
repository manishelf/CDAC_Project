import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utiles/auth';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import parkImage from '../utiles/park.jpg';

const Login = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const isValidateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const isValidatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    // Reset message before validation
    setMessage('');

    if (!isValidateEmail(userData.email)) {
      setMessage('Invalid email. It should end with @gmail.com and contain alphanumeric characters.');
      return;
    }

    if (!isValidatePassword(userData.password)) {
      setMessage('Password must be at least 8 characters long and contain at least one uppercase letter.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:4000/login', userData);
      setToken(res.data.token);
      navigate('/home');
    } catch (error) {
      setMessage('Login failed. Check your credentials.');
    }
  };

  return (
    <MDBContainer className="d-flex justify-content-center align-items-center h-100">
      <MDBRow className="d-flex justify-content-center w-100">
        <div className="text-center mb-4">
          <img src={parkImage} style={{ width: '200px' }} alt="logo" />
          <h4 className="mt-1 mb-5 pb-1">ParkANDGo</h4>
        </div>

        <MDBCol md="4" className="p-4 shadow-sm rounded">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <MDBInput
              placeholder="Email"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
              className="mb-4"
            />
            <MDBInput
              placeholder="Password"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
              className="mb-4"
            />
            <section className='d-flex justify-content-center'>
              <button type='submit' className='btn btn-primary'>Login</button>
            </section>
          </form>
          {message && (
            <p className="text-danger text-center" style={{ marginTop: '10px' }}>
              {message}
            </p>
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
