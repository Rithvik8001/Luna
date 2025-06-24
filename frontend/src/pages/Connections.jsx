import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_API_URL } from "../constants/url";
import { useNavigate } from "react-router-dom";
import { addConnections } from "../utils/connectionSlice";

const ConnectionsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const connections = useSelector((state) => state.connections.connections);

  // Fetch user data if not already loaded
  const fetchUser = async () => {
    if (userData) return;
    try {
      const response = await axios.get(`${BASE_API_URL}/profile`, {
        withCredentials: true,
      });
      dispatch(addUser(response.data.data));
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/login");
      } else {
        console.log(error);
      }
    }
  };

  const getConnections = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    getConnections();
  }, []);

  // Show loading state while fetching user data
  if (!userData)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (connections.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center">
        No connections found
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col mt-12">
        <h1 className="text-5xl font-medium tracking-tighter text-center mb-12">
          Connections
        </h1>
        <div className="w-full mx-auto max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {connections.map((connection) => (
              <div
                key={connection._id}
                className="w-full max-w-sm bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-2 rounded-lg overflow-hidden">
                  <img
                    src={connection.photoUrl}
                    alt={connection.firstName}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="p-2">
                    <h2 className="text-xl tracking-tighter text-gray-900 font-medium mb-2">
                      {connection.firstName} {connection.lastName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {connection.about.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectionsPage;
