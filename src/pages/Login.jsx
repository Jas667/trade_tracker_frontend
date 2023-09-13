import React from "react";
import loginImg from "../assets/data_examine_2_horizontal.jpg";
import { login } from "../services/authService.jsx";
import { useState, useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
// import { useHistory } from "react-router-dom";

export default function Login() {
  //useState hook for form data
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  //error message for incorrect login popup
  const [errorMessage, setErrorMessage] = useState({
    identifier: null,
    password: null,
  });

  //add state to track when the form is submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  //renderTooltip function for tooltip
  const renderTooltip = (props, message) => (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );

  useEffect(() => {
    if (isSubmitting) {
      setErrorMessage({
        identifier: null,
        password: null,
      });
      setIsSubmitting(false); // Reset the isSubmitting state
    }
  }, [formData, isSubmitting]);

  //useHistory hook to redirect to dashboard
  //   const history = useHistory();

  //handle change function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true); // Mark the form as being submitted
    try {
      const response = await login(formData);
      const data = await response.json();

      //switch statement to handle different responses
      switch (response.status) {
        case 200:
          console.log("Login successful", data);
          setErrorMessage({ identifier: null, password: null }); // Clear any previous errors on success
          break;
        case 400:
          console.log("Login failed", data);
          if (data.message.includes("User")) {
            setErrorMessage((prev) => ({
              ...prev,
              identifier: "User not found.",
            }));
          } else {
            setErrorMessage((prev) => ({ ...prev, password: data.message }));
          }
          break;
      }
    } catch (e) {
      console.error("Login error", e);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-cover"
          src={loginImg}
          alt="stock market chart data being examined"
        />
      </div>
      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-[400px] w-full mx-auto bg-white p-4"
        >
          <h2 className="text-4xl font-bold text-center py-6">Trade Tracker</h2>
          <div className="flex flex-col py-2">
            <label>Username/Email</label>
            <OverlayTrigger
              placement="right"
              show={!!errorMessage.identifier}
              overlay={(props) => renderTooltip(props, errorMessage.identifier)}
            >
              <input
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                className="border p-2"
                type="text"
              />
            </OverlayTrigger>
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <OverlayTrigger
              placement="right"
              show={!!errorMessage.password}
              overlay={(props) => renderTooltip(props, errorMessage.password)}
            >
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border p-2"
                type="password"
              />
            </OverlayTrigger>
          </div>
          <button
            type="submit"
            className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Sign In
          </button>
          <div className="flex justify-between">
            <p>Creat Account</p>
          </div>
        </form>
      </div>
    </div>
  );
}
