import { useState } from "react";

export function useErrorHandler(context) {
  const [errorMessage, setErrorMessage] = useState({
    username: null,
    email: null,
    first_name: null,
    last_name: null,
    password: null,
    identifier: null,
  });

  const handleErrors = (response, data) => {
    switch (context) {
      case "login":
        handleLoginErrors(response, data);
        break;
      case "register":
        handleRegisterErrors(response, data);
        break;
      default:
        setDefaultError();
        break;
    }
  };

  const handleLoginErrors = (response, data) => {
    switch (response.status) {
      case 200:
        resetErrorMessage();
        break;
      case 400:
        if (data.message.includes("User")) {
          setErrorMessage((prev) => ({
            ...prev,
            identifier: "User not found.",
          }));
        } else {
          setErrorMessage((prev) => ({ ...prev, password: data.message }));
        }
        break;
      default:
        setDefaultError();
        break;
    }
  };

  const handleRegisterErrors = (response, data) => {
    switch (response.status) {
      case 201:
        resetErrorMessage();
        break;
      case 400:
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
        setDefaultError();
        break;
    }
  };

  const resetErrorMessage = () => {
    setErrorMessage({
      username: null,
      email: null,
      first_name: null,
      last_name: null,
      password: null,
      identifier: null,
    });
  };

  const setDefaultError = () => {
    setErrorMessage((prev) => ({
      ...prev,
      email: "Oops, something went wrong! Please try again.",
    }));
  };

  return [errorMessage, handleErrors];
}