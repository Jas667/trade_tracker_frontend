import React from "react";
import { Button } from "react-bootstrap";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(navigate); // Passing the navigate function to the logout service
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button variant="outline-light" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
