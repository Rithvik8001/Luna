import React from "react";

const Profile = ({ userData }) => {
  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Profile</h2>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            <img
              src={userData?.photoUrl || "https://github.com/shadcn.png"}
              alt="profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-medium text-gray-900">
                {userData?.firstName} {userData?.lastName}
              </h3>
              <p className="text-gray-500">{userData?.age} years old</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
            {userData?.about && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  About
                </h4>
                <p className="text-gray-600">{userData.about}</p>
              </div>
            )}

            {userData?.gender && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Gender
                </h4>
                <p className="text-gray-600 capitalize">{userData.gender}</p>
              </div>
            )}

            {userData?.skills && userData.skills.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
