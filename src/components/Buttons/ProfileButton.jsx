import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
      const navigate = useNavigate();

      const profileNavigate = () => {
            navigate("/profile");
  };

  return (
    <Button variant="outline-light" onClick={profileNavigate} className="mr-2">
      Profile
    </Button>
  );
}

export default ProfileButton;
