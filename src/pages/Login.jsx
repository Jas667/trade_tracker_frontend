import React from "react";
import loginImg from "../assets/data_examine_2_horizontal.jpg";
import { login } from "../services/authService.jsx";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { useHistory } from "react-router-dom";

export default function Login() {
  //useState hook for form data
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  //error message for incorrect login popup
  const [errorMessage, setErrorMessage] = useState(null);

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
    try {
      const response = await login(formData);
      const data = await response.json();

      //switch statement to handle different responses
      switch (response.status) {
        case 200:
          console.log("Login successful", data);
          break;
        case 400:
          console.log("Login failed", data);
          setErrorMessage(data.message || "Incorrect password or username.");
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
            <input
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              className="border p-2"
              type="text"
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2"
              type="password"
            />
          </div>
          <button
            type="submit"
            className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Sign In
          </button>
          <div className="flex justify-between">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" />
              Remember Me
            </p>
            <p>Creat Account</p>
          </div>
        </form>
        <Modal show={!!errorMessage} onHide={() => setErrorMessage(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{errorMessage}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setErrorMessage(null)}>Close</Button>
                </Modal.Footer>
            </Modal>
      </div>
    </div>
  );
}
