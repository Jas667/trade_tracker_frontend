import React, { useState, useEffect } from "react";
import ColorSchemesExample from "../components/NavBar/NavBar";
import { getProfile, updatePassword, deleteUserProfile } from "../services/profileService";
import UserProfile from "../components/ProfilePage.jsx/UserProfile";
import PasswordEdit from "../components/ProfilePage.jsx/PasswordEdit";
import DeleteProfile from "../components/ProfilePage.jsx/DeleteProfile";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  // States to handle user details
  const [profile, setProfile] = useState({
    username: "",
    email: "",
  });

  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null); // This can be 'success' or 'danger'

  // // Load user details from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      const fetchedUserData = await getProfile();
      if (fetchedUserData.message === "User found") {
        const extractedUserData = {
          username: fetchedUserData.data.user.username,
          email: fetchedUserData.data.user.email,
        };

        setProfile(extractedUserData);
        setUserData(extractedUserData);
      }
    };
    fetchData();
  }, []);


  const changePassword = async (oldPassword, newPassword) => {
    const response = await updatePassword({ oldPassword, newPassword });
    if (response.message === "Password updated") {
      setAlertType("success");
      setAlertMessage("Password updated successfully!");
    } else {
      setAlertType("danger");
      setAlertMessage(response.message);
    }
  };

  const deleteProfile = async () => { 
    const response = await deleteUserProfile();
    if(response.status === 204) {
      navigate("/login");
    } else {
      setAlertType("danger");
      setAlertMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <ColorSchemesExample />
      <div className="my-3 mx-40 bg-gray-50 flex flex-col justify-center overflow-hidden">
        <div className="text-xl font-bold p-4">Profile</div>
        <UserProfile profile={profile} />
        <PasswordEdit
          changePassword={changePassword}
          alertMessage={alertMessage}
          alertType={alertType}
          setAlertMessage={setAlertMessage}
        />
        <div className="flex">
          <DeleteProfile deleteProfile={deleteProfile} />
        </div>
      </div>
    </>
  );
};

export default Profile;
