import React from 'react';
import { Button } from 'react-bootstrap';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log(response);

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (e) { 
      console.error(e);
    }
  };

  return (
    <Button variant="outline-light" onClick={onLogout || handleLogout}>Logout</Button>
  );
}

export default LogoutButton;

