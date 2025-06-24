import React from "react";

const Requests = ({ requests }) => {
  if (!requests || requests.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-2">
            No Requests
          </h2>
          <p className="text-gray-500">
            You don't have any pending connection requests.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col mt-12">
      <h1 className="text-5xl font-medium tracking-tighter text-center mb-12">
        Connection Requests
      </h1>
      <div className="w-full mx-auto max-w-4xl">
        <div className="flex flex-col gap-4">
          {requests.map((request) => (
            <div
              key={request._id}
              className="flex items-center justify-between border border-gray-200 rounded-md p-6 hover:shadow-md transition-shadow duration-300 bg-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={request.fromUserId.photoUrl}
                  alt={request.fromUserId.firstName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-lg font-medium text-gray-900">
                    {request.fromUserId.firstName} {request.fromUserId.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {request.fromUserId.about}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                  Accept
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Requests;
