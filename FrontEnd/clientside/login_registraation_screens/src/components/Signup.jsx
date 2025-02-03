import React,{useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { setToken } from "../utiles/auth";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';


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
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
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
            setMessage("License is required.");
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

    return (
<MDBContainer className="d-flex justify-content-center align-items-center vh-100">
    <MDBRow className="w-100 d-flex justify-content-center">
        <MDBCol md="6" lg="4" className="p-4 border rounded shadow">
            <h2 className="text-center mb-4">Sign Up</h2>
            {message && <p className="text-danger text-center">{message}</p>}

            <form onSubmit={handleSubmit}>
                <section className="mb-3">
                <label htmlFor="name">Name:</label>
                <MDBInput type="text" name="name" value={userData.name} onChange={handleInputChange} required />
                </section>

                <section className="mb-3">
                <label htmlFor="email">Email:</label>
                <MDBInput type="email" name="email" value={userData.email} onChange={handleInputChange} required />
                </section>

                <section className="mb-3">
                <label htmlFor="password">Password:</label>
                <MDBInput type="password" name="password" value={userData.password} onChange={handleInputChange}  required />
                </section>

                <section className="mb-3">
                <label htmlFor="license">License:</label>
                <MDBInput type="text" name="license" value={userData.license} onChange={handleInputChange} required />
                </section>

                <section className="mb-3">
                <label htmlFor="mobile">Mobile No:</label>
                <MDBInput type="text" name="mobile" value={userData.mobile} onChange={handleInputChange}  required />
                </section>

                <section>
                <label htmlFor="role">Role:</label>
                    <select name="role" value={userData.role} onChange={handleInputChange} className="form-select mb-3">
                        <option value="User">User</option>
                        <option value="Manager">Manager</option>
                    </select>
                </section>

                <section className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </section>
            </form>
        </MDBCol>
    </MDBRow>
</MDBContainer>
);
};

export default SignUp;