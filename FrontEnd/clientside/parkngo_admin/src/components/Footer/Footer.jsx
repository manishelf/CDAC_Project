import React from 'react';
import './footer.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-card">
          <div className="footer-content">
            <div className="footer-about">
              <h2>About Online Parking</h2>
              <p>Online Parking helps you find and book parking spaces easily. Our platform offers a seamless experience, allowing you to search for parking spots in real-time, compare prices, and reserve the best option that suits your needs. With a user-friendly interface and a wide range of parking locations, we ensure that you can park your vehicle without any hassle. Whether you're looking for short-term parking, long-term parking, or special event parking, Online Parking has got you covered.</p>
            </div>
            <div className="footer-contact">
              <h2>Contact Us</h2>
              <p><FaMapMarkerAlt className="icon" /> Sunbeam infotech</p>
              <p><FaPhone className="icon" /> +91 xxxxx xxxxx</p>
              <p><FaEnvelope className="icon" />parkngo@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom text-bg-dark">
        <p>© {new Date().getFullYear()} ParknGo. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
