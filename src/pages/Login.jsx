import React from "react";
import loginImg from "../assets/data_examine_2_horizontal.jpg";
import { login } from "../services/authService.jsx";
import { useState, useEffect } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";
import { InputWithErrorTooltip } from "../components/InputWithErrorTooltip";
import { HalfScreenImageVertical } from "../components/HalfScreenImageVertical";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

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

  //success message for registration
  const [successMessage, setSuccessMessage] = useState(null);
  const [testMessage, setTestMessage] = useState(null);

  //add state to track when the form is submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const registered = searchParams.get("registered");
    const test = searchParams.get("test");
    if (registered) {
      setSuccessMessage("Registration successful. Please log in.");
    }
    if (test) {
      setTestMessage(
        `Currently in test only mode. To test site, please log in using:<br /><br />Username = TestUser<br />Password = adminadmin`
      );
    }
  }, []);

  useEffect(() => {
    if (isSubmitting) {
      setErrorMessage({
        identifier: null,
        password: null,
      });
      setIsSubmitting(false); // Reset the isSubmitting state
      setSuccessMessage(null);
    }
  }, [isSubmitting]);

  //useHistory hook to redirect to dashboard
  const navigate = useNavigate();

  //handle change function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //renderTooltip function for tooltip
  const renderTooltip = (props, message) => (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );

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
          setErrorMessage({ identifier: null, password: null }); // Clear any previous errors on success

          // Check if the logged in user is the test user. This is only for testing purposes.
          // Check if the logged in user is the test user. This is only for testing purposes.
          // Check if the logged in user is the test user. This is only for testing purposes.
          console.log(data)
          if (formData.identifier === "TestUser") {
            // Store the information that the test user has logged in
            sessionStorage.setItem("isTestUser", "true");
          } else {
            sessionStorage.removeItem("isTestUser");
          }

          navigate("/");
          break;
        case 400:
          setErrorMessage((prev) => ({
            ...prev,
            password: "Incorrect Login Info",
          }));
          break;
        case 429:
          setErrorMessage((prev) => ({
            ...prev,
            identifier: "Too many login attempts. Please try again later.",
          }));
          break;
        default:
          setErrorMessage((prev) => ({
            ...prev,
            email: "Oops, something went wrong! Please try again.",
          }));
      }
    } catch (e) {
      console.error("Login error", e);
    }
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
          {successMessage && (
            <Alert
              variant="success"
              onClose={() => setSuccessMessage(null)}
              dismissible
            >
              Registration successful. Please log in.
            </Alert>
          )}
          {testMessage && (
            <Alert
              variant="info"
              onClose={() => setSuccessMessage(null)}
              dismissible
            >
              <div dangerouslySetInnerHTML={{ __html: testMessage }} />
            </Alert>
          )}
          <InputWithErrorTooltip
            name="identifier"
            label="Username/Email"
            type="text"
            value={formData.identifier}
            errorMessage={errorMessage.identifier}
            onChange={handleChange}
          />
          <InputWithErrorTooltip
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            errorMessage={errorMessage.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Sign In
          </button>
          <div className="flex justify-between">
            <Link to="/register">Creat Account</Link>
            <Link to="/forgot-password">Forgotten Password</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
