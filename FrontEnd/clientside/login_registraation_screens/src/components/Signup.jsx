import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { setToken } from "../utiles/auth";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import parkImage from '../res/mainIcon.png';

const SignUp = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        license: "",
        role: "User",
        mobile: "",
    });

    const [message, setMessage] = useState("");
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z]{2,}\.com$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
    };

    const isValidateMobile = (mobile) => {
        const mobileRegex = /^[0-9]{10}$/;
        return mobileRegex.test(mobile);
    };

    const isValidName = (name) => {
        return name.trim().length > 0;
    };

    const isValidLicense = (license) => {
        return license.trim().length > 0;
    };

    const isValidRole = (role) => {
        return role.trim().length > 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidName(userData.name)) {
            setMessage("Name is required.");
            return;
        }

        if (!isValidEmail(userData.email)) {
            setMessage("Invalid email. It should end with @gmail.com and contain alphanumeric characters.");
            return;
        }

        if (!isValidPassword(userData.password)) {
            setMessage("Password must be at least 8 characters long and contain at least one uppercase letter.");
            return;
        }

        if (!isValidLicense(userData.license)) {
            setMessage("Your Driving License is required.");
            return;
        }

        if (!isValidRole(userData.role)) {
            setMessage("Role is required.");
            return;
        }

        if (!isValidateMobile(userData.mobile)) {
            setMessage("Invalid mobile number. It should be 10 digits long.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:4000/signup", userData);
            setToken(res.data.token);
            navigate("/login");
        } catch (error) {
            setMessage("SignUp failed. Please try again.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleNext = () => {
        if (step === 0 && !isValidName(userData.name)) {
            setMessage("Name is required.");
            return;
        }

        if (step === 1 && !isValidEmail(userData.email)) {
            setMessage("Invalid email. It should have a domain and contain alphanumeric characters only.");
            return;
        }

        if (step === 2 && !isValidPassword(userData.password)) {
            setMessage("Password must be at least 8 characters long and contain at least one uppercase letter.");
            return;
        }

        if (step < 5) {
            setStep(step + 1);
            setMessage("");
        }
    };

    const handlePrev = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <MDBContainer className="d-flex justify-content-center align-items-center">
            <MDBRow className="w-100 d-flex justify-content-center">
                <MDBCol md="8">
                    <div className='d-flex justify-content-center'>
                        <img src={parkImage} alt="logo" />
                    </div>
                    <h1 className='display-4 fw-bold text-body-emphasis'>Register to ParkNGo</h1>
                    <p className="fs-4">Create your account today and experience the convenience of seamless parking with ParkNGo. Don't miss out on reserving your spot in just a few clicks!</p>
                </MDBCol>
                <MDBCol lg="4" className="p-4 align-content-center border rounded shadow">
                    {message && <p className="text-danger text-center">{message}</p>}

                    <form onSubmit={handleSubmit}>
                        {step === 0 && (
                            <section className="mb-3">
                                <label htmlFor="name" className="display-6">What can we call you?</label>
                                <MDBInput type="text" name="name" value={userData.name} 
                                            onChange={handleInputChange} placeholder="your name" required 
                                            className="form-control-lg m-2 text-center"/>
                            </section>
                        )}
                        {step === 1 && (
                            <section className="mb-3">
                                <label htmlFor="email" className="display-6">Your email</label>
                                <MDBInput type="email" name="email" value={userData.email} 
                                placeholder="email-id"
                                onChange={handleInputChange} required 
                                className="form-control-lg m-2 text-center"/>
                                <div className="row">
                                <div className="col">
                                <MDBInput type="text" name="otp" value={userData.otp} 
                                placeholder="OTP"
                                onChange={handleInputChange} required 
                                className="form-control-lg m-2 text-center col"
                                />
                                </div>
                                <div className="col">
                                <button className="btn btn-primary btn-lg m-2" type="button">Send otp</button>
                                </div>
                                </div>
                            </section>
                        )}
                        {step === 2 && (
                            <>
                            <section className="mb-3">
                                <label htmlFor="password" className="fs-4">Password:</label>
                                <MDBInput type="password" name="password" value={userData.password} onChange={handleInputChange} required />
                            </section>
                            <section className="mb-3">
                                <label htmlFor="confirmPassword" className="fs-6">Confirm Password:</label>
                                <MDBInput type="password" name="confirmPassword" required />
                            </section>
                            </>
                        )}
                        {step === 3 && (
                            <section className="mb-3">
                                <label htmlFor="license" className="fs-4">Your Driving License:</label>
                                <MDBInput type="text" name="license" value={userData.license} onChange={handleInputChange} required />
                            </section>
                        )}
                        {step === 4 && (
                            <section className="mb-3">
                                <label htmlFor="mobile" className="fs-4">Mobile No:</label>
                                <MDBInput type="text" name="mobile" value={userData.mobile} onChange={handleInputChange} required />
                            </section>
                        )}
                        <section className="d-flex justify-content-center mt-3">
                            {step > 0 && (
                                <button type="button" className="btn btn-secondary me-2 btn-lg" onClick={handlePrev}>Previous</button>
                            )}
                            {step < 4 && (
                                <button type="button" className="btn btn-primary btn-lg" onClick={handleNext}>Next</button>
                            )}
                            {step === 4 && (
                                <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                            )}
                        </section>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default SignUp;
