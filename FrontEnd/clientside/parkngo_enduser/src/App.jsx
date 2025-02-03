import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import PaymentConfirmationScreen from "./screens/PaymentConfirmationScreen";
import PaymentReciptScreen from "./screens/PaymentReciptScreen";
import UserReviewScreen from "./screens/UserReviewScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* Navigation Bar for Routing */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/payment-confirmation">Payment Confirmation</Link> |{" "}
        <Link to="/payment-receipt">Payment Receipt</Link> |{" "}
        <Link to="/user-review">User Review</Link>
      </nav>

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/payment-confirmation"
          element={<PaymentConfirmationScreen />}
        />
        <Route path="/payment-receipt" element={<PaymentReciptScreen />} />
        <Route path="/user-review" element={<UserReviewScreen />} />

        {/* Redirect any unknown route to HomeScreen */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Toast Notifications */}
      <ToastContainer />
    </>
  );
}

export default App;
