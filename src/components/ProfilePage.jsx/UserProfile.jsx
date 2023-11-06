import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // for icons
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

function UserProfile({ profile, onEdit }) {
  // Destructure profile props for ease of use
  const { username, email, firstName, lastName } = profile;

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-wrap justify-center">
        {/* UserProfile Item */}
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div>
              <div className="text-gray-700 font-bold">Username</div>
              <div className="text-gray-600">{username}</div>
            </div>
            <button onClick={() => onEdit('username')} className="btn btn-primary btn-sm">
              <i className="fas fa-edit"></i> Edit
            </button>
          </div>
        </div>

        {/* Email Item */}
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div>
              <div className="text-gray-700 font-bold">Email</div>
              <div className="text-gray-600">{email}</div>
            </div>
            <button onClick={() => onEdit('email')} className="btn btn-primary btn-sm">
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
            <button onClick={() => onEdit('firstName')} className="btn btn-primary btn-sm">
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
            <button onClick={() => onEdit('lastName')} className="btn btn-primary btn-sm">
              <i className="fas fa-edit"></i> Edit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserProfile;
