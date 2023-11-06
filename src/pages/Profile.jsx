import React, { useState, useEffect } from "react";
import ColorSchemesExample from "../components/NavBar/NavBar";
import { getProfile } from "../services/profileService";
import UserProfile from "../components/ProfilePage.jsx/UserProfile";
import PasswordEdit from "../components/ProfilePage.jsx/PasswordEdit";

const Profile = () => {
  const [userData, setUserData] = useState({});
  // States to handle user details
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  // // Load user details from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      const fetchedUserData = await getProfile();
      if (fetchedUserData.message === "User found") {
        const extractedUserData = {
          username: fetchedUserData.data.user.username,
          email: fetchedUserData.data.user.email,
          firstName: fetchedUserData.data.user.first_name,
          lastName: fetchedUserData.data.user.last_name,
        };

        setProfile(extractedUserData);
        setUserData(extractedUserData);
      }
    };
    fetchData();
  }, []);

    // Function to call API for password change
    const changePassword = async (currentPassword, newPassword) => {
      // Placeholder for API call
      console.log('Submitting new password to the server...');
  
      // Replace the console.log with your actual API call
      // const response = await yourApiService.changePassword({ currentPassword, newPassword });
      // Handle the response accordingly
    };

  const handleEdit = (section) => {
    // Handle edit logic here, maybe open a modal or form
    console.log(`Edit ${section}`);
  };

  return (
    <>
      <ColorSchemesExample />
      <div className="my-3 mx-40 bg-gray-50 flex flex-col justify-center overflow-hidden">
        <div className="text-xl font-bold p-4">Profile</div>
        <UserProfile profile={profile} onEdit={handleEdit} />
        <PasswordEdit onSubmit={changePassword} />
      </div>
    </>
  );
};

export default Profile;
