import React, { useEffect } from "react";
import { HalfScreenImageVertical } from "../components/HalfScreenImageVertical";
import loginImg from "../assets/data_examine_2_horizontal.jpg";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { InputWithErrorTooltip } from "../components/InputWithErrorTooltip";
import {
  resetPasswordEmail,
  resetPasswordUsingResetCode,
} from "../services/profileService";
import { Alert } from "react-bootstrap";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [view, setView] = useState("forgot-password");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCodeChange = (e) => setCode(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  useEffect(() => {
    // Reset view to 'forgot-password' when the component is unmounted or path changes
    return () => {
      setView("forgot-password");
    };
  }, [location.pathname]);

  useEffect(() => {
    if (newPassword && newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
    } else {
      setErrorMessage(null);
    }
  }, [newPassword, confirmPassword]);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPasswordEmail(email);
      setAlert({ show: true, message: response.message });
      setEmail("");
      setView("code-submit");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPasswordUsingResetCode(code, newPassword);
      setAlert({ show: true, message: response.message });
      setCode("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleCloseAlert = () => setAlert({ ...alert, show: false });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <HalfScreenImageVertical
        src={loginImg}
        alt="stock market chart data being examined"
      />
      <div className="bg-gray-100 flex flex-col justify-center">
        {view === "forgot-password" ? (
          <form
            onSubmit={handleSubmitEmail}
            className="max-w-[400px] w-full mx-auto bg-white p-4"
          >
            <h2 className="text-4xl font-bold text-center py-6">
              Trade Tracker
            </h2>
            <>
              <div>
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
            </>
            <div className="flex justify-between">
              <Link to="/register">Creat Account</Link>
              <Link to="/login">Sign In</Link>
            </div>
          </form>
        ) : (
          <>
            <form
              onSubmit={handleSubmitPassword}
              className="max-w-[400px] w-full mx-auto bg-white p-4"
            >
              {alert.show && (
                <Alert variant="info" onClose={handleCloseAlert} dismissible>
                  {alert.message}
                </Alert>
              )}
              {/* Code submit form */}
              <InputWithErrorTooltip
                name="code"
                label="Code"
                type="text"
                value={code}
                onChange={handleCodeChange}
              />
              <InputWithErrorTooltip
                name="newPassword"
                label="New Password"
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
              <InputWithErrorTooltip
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                errorMessage={errorMessage}
                onChange={handleConfirmPasswordChange}
              />
              <button
                type="submit"
                disabled={
                  !code.trim() ||
                  !newPassword.trim() ||
                  !confirmPassword.trim() ||
                  newPassword !== confirmPassword
                }
                // className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
                className={`border w-full my-5 py-2 text-white ${
                  !code.trim() ||
                  !newPassword.trim() ||
                  !confirmPassword.trim() ||
                  newPassword !== confirmPassword
                    ? "bg-indigo-300 opacity-50 cursor-not-allowed button-disabled-hover"
                    : "bg-indigo-600 hover:bg-indigo-500"
                }`}
              >
                Submit
              </button>
              <div className="flex justify-between">
                <Link to="/register">Create Account</Link>
                <Link to="/login">Sign In</Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
