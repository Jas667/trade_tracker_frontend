import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const PasswordEdit = ({ changePassword, alertMessage, setAlertMessage, alertType }) => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const canSubmit =
    passwords.oldPassword &&
    passwords.newPassword &&
    passwords.confirmPassword &&
    passwords.newPassword === passwords.confirmPassword;

  const handleSubmit = (event) => {
    event.preventDefault();
    changePassword(passwords.oldPassword, passwords.newPassword);
  };

  return (
    <div className="container mx-auto mt-10">
      {alertMessage && (
        <Alert
          variant={alertType}
          onClose={() => setAlertMessage(null)}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="oldPassword"
          >
            Current Password
          </label>
          <div className="flex justify-between items-center">
            <input
              type={passwordVisible.oldPassword ? "text" : "password"}
              id="oldPassword"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <div
              onClick={() =>
                setPasswordVisible({
                  ...passwordVisible,
                  oldPassword: !passwordVisible.oldPassword,
                })
              }
              className="p-2"
            >
              {passwordVisible.oldPassword ? "Hide" : "Show"}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <div className="flex justify-between items-center">
            <input
              type={passwordVisible.newPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <div
              onClick={() =>
                setPasswordVisible({
                  ...passwordVisible,
                  newPassword: !passwordVisible.newPassword,
                })
              }
              className="p-2"
            >
              {passwordVisible.newPassword ? "Hide" : "Show"}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm New Password
          </label>
          <div className="flex justify-between items-center">
            <input
              type={passwordVisible.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <div
              onClick={() =>
                setPasswordVisible({
                  ...passwordVisible,
                  confirmPassword: !passwordVisible.confirmPassword,
                })
              }
              className="p-2"
            >
              {passwordVisible.confirmPassword ? "Hide" : "Show"}
            </div>
          </div>
          {passwords.newPassword && passwords.newPassword.length < 8 ? (
            <p className="text-red-500 mt-2">
              New password must be at least 8 characters long
            </p>
          ) : null}
          {passwords.newPassword &&
          passwords.confirmPassword &&
          passwords.newPassword !== passwords.confirmPassword ? (
            <p className="text-red-500 mt-2">
              New Password and Confirm New Password must match.
            </p>
          ) : null}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            onSubmit={handleSubmit}
            disabled={!canSubmit}
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              !canSubmit ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordEdit;
