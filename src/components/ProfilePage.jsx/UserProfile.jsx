import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // for icons
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import { editProfile } from "../../services/profileService";

function UserProfile({ profile, onEdit }) {
  // Destructure profile props for ease of use
  const { username, email, firstName, lastName } = profile;

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
              <div className="text-gray-600">{email}</div>
            </div>
            <button
              onClick={() => onEdit("email")}
              className="btn btn-primary btn-sm"
            >
              <i className="fas fa-edit"></i> Edit
            </button>
          </div>
        </div>

        {/* First Name Item */}
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div>
              <div className="text-gray-700 font-bold">First Name</div>
              <div className="text-gray-600">{firstName}</div>
            </div>
            <button
              onClick={() => onEdit("firstName")}
              className="btn btn-primary btn-sm"
            >
              <i className="fas fa-edit"></i> Edit
            </button>
          </div>
        </div>

        {/* Last Name Item */}
        <div className="w-full md:w-1/2 px-3">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div>
              <div className="text-gray-700 font-bold">Last Name</div>
              <div className="text-gray-600">{lastName}</div>
            </div>
            <button
              onClick={() => onEdit("lastName")}
              className="btn btn-primary btn-sm"
            >
              <i className="fas fa-edit"></i> Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
