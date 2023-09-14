import React from "react";
import loginImg from "../assets/data_examine_2_horizontal.jpg";
import { register } from "../services/authService.jsx";
import { useState, useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
// import { useHistory } from "react-router-dom";

export default function Register() {
  //useState hook for form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: "",
  });
  //   //error message for incorrect login popup
  const [errorMessage, setErrorMessage] = useState({
    username: null,
    email: null,
    first_name: null,
    last_name: null,
    password: null,
  });

  //   //add state to track when the form is submitted
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  //   //renderTooltip function for tooltip
  const renderTooltip = (props, message) => (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );

  useEffect(() => {
    if (isSubmitting) {
      setErrorMessage({
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        password: null,
      });
      setIsSubmitting(false); // Reset the isSubmitting state
    }
  }, [formData, isSubmitting]);

  //This use effect will check if the password and confirm password match
  useEffect(() => {
    if (formData.password && formData.password !== confirmPassword) {
      setErrorMessage((prev) => ({
        ...prev,
        password_confirm: "Passwords do not match.",
      }));
    } else {
      setErrorMessage((prev) => ({
        ...prev,
        password_confirm: null,
      }));
    }
  }, [formData.password, confirmPassword]);

  //useHistory hook to redirect to dashboard
  //   const history = useHistory();

  //handle change function
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password_confirm") {
      setConfirmPassword(value);
    }

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
      const response = await register(formData);
      const data = await response.json();

      //switch statement to handle different responses
      switch (response.status) {
        case 201:
          console.log("User Registered", data);
          setErrorMessage({
            username: null,
            email: null,
            first_name: null,
            last_name: null,
            password: null,
          }); // Clear any previous errors on success
          break;
        case 400:
          console.log("Registration failed", data);
          if (data.message.includes("Missing")) {
            setErrorMessage((prev) => ({
              ...prev,
              username: "Missing required fields.",
            }));
          } else if (data.message.includes("Invalid fields")) {
            setErrorMessage((prev) => ({
              ...prev,
              username: "Invalid fields.",
            }));
          } else if (data.message.includes("Invalid email")) {
            setErrorMessage((prev) => ({
              ...prev,
              email: "Invalid Email.",
            }));
          } else if (data.message.includes("Username must")) {
            setErrorMessage((prev) => ({
              ...prev,
              username: "Username must be between 3 and 20 characters.",
            }));
          } else if (data.message.includes("Password")) {
            setErrorMessage((prev) => ({
              ...prev,
              password: "Password must be at least 8 characters.",
            }));
          } else if (data.message.includes("Email alread")) {
            setErrorMessage((prev) => ({
              ...prev,
              email: "Email already exists.",
            }));
          } else if (data.message.includes("Username alread")) {
            setErrorMessage((prev) => ({
              ...prev,
              username: "Username already exists.",
            }));
          }
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
          <h2 className="text-4xl font-bold text-center py-6">Register</h2>
          <div className="flex flex-col py-2">
            <label>Username</label>
            <OverlayTrigger
              placement="right"
              show={!!errorMessage.username}
              overlay={(props) =>
                errorMessage.username ? (
                  renderTooltip(props, errorMessage.username)
                ) : (
                  <></>
                )
              }
            >
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="border p-2"
                type="text"
              />
            </OverlayTrigger>
          </div>
          <div className="flex flex-col py-2">
            <label>Email</label>
            <OverlayTrigger
              placement="right"
              show={!!errorMessage.email}
              overlay={(props) =>
                errorMessage.email ? (
                  renderTooltip(props, errorMessage.email)
                ) : (
                  <></>
                )
              }
            >
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2"
                type="text"
              />
            </OverlayTrigger>
          </div>
          <div className="flex flex-col py-2">
            <label>First Name</label>
            <OverlayTrigger
              placement="right"
              show={!!errorMessage.first_name}
              overlay={(props) =>
                errorMessage.first_name ? (
                  renderTooltip(props, errorMessage.first_name)
                ) : (
                  <></>
                )
              }
            >
              <input
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="border p-2"
                type="text"
              />
            </OverlayTrigger>
            <div className="flex flex-col py-2">
              <label>Last name</label>
              <OverlayTrigger
                placement="right"
                show={!!errorMessage.last_name}
                overlay={(props) =>
                  errorMessage.last_name ? (
                    renderTooltip(props, errorMessage.last_name)
                  ) : (
                    <></>
                  )
                }
              >
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="border p-2"
                  type="text"
                />
              </OverlayTrigger>
            </div>
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <OverlayTrigger
              placement="right"
              show={!!errorMessage.password}
              overlay={(props) =>
                errorMessage.password ? (
                  renderTooltip(props, errorMessage.password)
                ) : (
                  <></>
                )
              }
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
          <div className="flex flex-col py-2">
            <label>Password Confirm</label>
            <OverlayTrigger
              placement="right"
              show={!!errorMessage.password_confirm}
              overlay={(props) =>
                errorMessage.password_confirm ? (
                  renderTooltip(props, errorMessage.password_confirm)
                ) : (
                  <></>
                )
              }
            >
              <input
                name="password_confirm"
                value={formData.identifier}
                onChange={handleChange}
                className="border p-2"
                type="password"
              />
            </OverlayTrigger>
          </div>
          <button
            type="submit"
            disabled={formData.password !== confirmPassword} // disable if passwords don't match
            className={`border w-full my-5 py-2 ${
              formData.password !== confirmPassword
                ? "bg-indigo-600 text-white cursor-not-allowed" // Disabled state
                : "bg-indigo-600 hover:bg-indigo-500 text-white" // Enabled state
            }`}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
