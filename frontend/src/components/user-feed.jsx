import React from "react";

const UserFeed = ({ feed }) => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 p-2 rounded-lg">
        <div className="w-full max-w-6xl mx-auto p-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {feed &&
              feed.map((item) => (
                <div
                  key={item._id}
                  className="w-full max-w-sm bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Profile Image */}
                  <div className="relative">
                    <img
                      src={item.photoUrl}
                      alt="profile"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Profile Info */}
                  <div className="p-4">
                    <div className="mb-3">
                      <h2 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.firstName} {item.lastName}
                      </h2>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.age} years old
                      </p>
                      {item.about && (
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                          {item.about}
                        </p>
                      )}
                    </div>

                    {/* Skills Section */}
                    {item.skills && item.skills.length > 0 && (
                      <div>
                        <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {item.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="flex w-full gap-2">
                          <button className="w-1/2 py-1.5 bg-black text-white mt-3 rounded-md">
                            Interested
                          </button>
                          <button className="w-1/2 py-1.5 bg-none border border-gray-200 text-black mt-3 rounded-md">
                            Ignore
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserFeed;
