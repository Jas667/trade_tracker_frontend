import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import { editProfile } from "../../services/profileService";

function UserProfile({ profile, onEdit }) {
  // Destructure profile props for ease of use
  const { username, email } = profile;

  //username edit
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [editedUsername, setEditedUsername] = useState(username);
  const [originalUsername, setOriginalUsername] = useState(username);

  useEffect(() => {
    setEditedUsername(username);
    setOriginalUsername(username);
  }, [username]);

  const toggleEditUsername = () => {
    if (isEditingUsername) {
      // Reset edited username to the original when cancelling
      setEditedUsername(originalUsername);
    }
    setIsEditingUsername(!isEditingUsername);
  };

  const handleUsernameChange = (event) => {
    setEditedUsername(event.target.value);
  };

  const saveUsername = async () => {
    const response = await editProfile({ username: editedUsername });
    if (response.message === "User updated") {
      setOriginalUsername(editedUsername);
      setIsEditingUsername(false);
    } else {
      setEditedUsername(originalUsername);
    }
  };

  //email edit
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedEmail, setEditedEmail] = useState(email);
  const [originalEmail, setOriginalEmail] = useState(email);

  useEffect(() => {
    setEditedEmail(email);
    setOriginalEmail(email);
  }, [email]);

  const toggleEditEmail = () => {
    if (isEditingEmail) {
      // Reset edited username to the original when cancelling
      setEditedEmail(originalEmail);
    }
    setIsEditingEmail(!isEditingEmail);
  };

  const handleEmailChange = (event) => {
    setEditedEmail(event.target.value);
  };

  const saveEmail = async () => {
    const response = await editProfile({ email: editedEmail });
    if (response.message === "User updated") {
      setOriginalEmail(editedEmail);
      setIsEditingEmail(false);
    } else {
      setEditedEmail(originalEmail);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-wrap justify-center">
        {/* Username Item */}
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div>
              <div className="text-gray-700 font-bold">Username</div>
              {!isEditingUsername ? (
                <div className="text-gray-600">{originalUsername}</div>
              ) : (
                <input
                  type="text"
                  value={editedUsername}
                  onChange={handleUsernameChange}
                  className="text-gray-600"
                />
              )}
            </div>
            {!isEditingUsername ? (
              <button
                onClick={toggleEditUsername}
                className="btn btn-primary btn-sm"
              >
                <i className="fas fa-edit"></i> Edit
              </button>
            ) : (
              <>
                <button
                  onClick={saveUsername}
                  disabled={originalUsername === editedUsername}
                  className="btn btn-primary btn-sm"
                >
                  Save
                </button>
                <button
                  onClick={toggleEditUsername}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Email Item */}
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div>
              <div className="text-gray-700 font-bold">Email</div>
              {!isEditingEmail ? (
                <div className="text-gray-600">{originalEmail}</div>
              ) : (
                <input
                  type="text"
                  value={editedEmail}
                  onChange={handleEmailChange}
                  className="text-gray-600"
                />
              )}
            </div>
            {!isEditingEmail ? (
              <button
                onClick={toggleEditEmail}
                className="btn btn-primary btn-sm"
              >
                <i className="fas fa-edit"></i> Edit
              </button>
            ) : (
              <>
                <button
                  onClick={saveEmail}
                  disabled={originalEmail === editedEmail}
                  className="btn btn-primary btn-sm"
                >
                  Save
                </button>
                <button
                  onClick={toggleEditEmail}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
