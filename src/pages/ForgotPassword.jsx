import React from "react";
import { HalfScreenImageVertical } from "../components/HalfScreenImageVertical";
import loginImg from "../assets/data_examine_2_horizontal.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { InputWithErrorTooltip } from "../components/InputWithErrorTooltip";
import { resetPasswordEmail } from "../services/profileService";
import { Alert } from "react-bootstrap";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "" });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPasswordEmail(email);
      setAlert({ show: true, message: response.message });
    } catch (e) {
      console.error(e);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <HalfScreenImageVertical
        src={loginImg}
        alt="stock market chart data being examined"
      />
      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-[400px] w-full mx-auto bg-white p-4"
        >
          <h2 className="text-4xl font-bold text-center py-6">Trade Tracker</h2>
          <div>
            {alert.show && (
              <Alert variant="info" onClose={handleCloseAlert} dismissible>
                {alert.message}
              </Alert>
            )}
            <h2>Reset Password</h2>
            <InputWithErrorTooltip
              name="email"
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <button
            type="submit"
            className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Reset Password
          </button>
          <div className="flex justify-between">
            <Link to="/register">Creat Account</Link>
            <Link to="/login">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
