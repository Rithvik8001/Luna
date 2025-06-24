import React, { useEffect, useState } from "react";
import Profile from "../components/profile";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL } from "../constants/url";
import EditProfile from "../components/edit-profile";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const [localUserData, setLocalUserData] = useState(userData);

  useEffect(() => {
    const fetchUser = async () => {
      if (userData) {
        setLocalUserData(userData);
        return;
      }
      try {
        const response = await axios.get(`${BASE_API_URL}/profile`, {
          withCredentials: true,
        });
        const user = response.data.data;
        dispatch(addUser(user));
        setLocalUserData(user);
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 400)
        ) {
          navigate("/login");
        }
      }
    };
    fetchUser();
  }, [userData, dispatch, navigate]);

  const handleProfileUpdate = (updatedData) => {
    setLocalUserData(updatedData);
  };

  if (!localUserData) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 py-8">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Profile userData={localUserData} />
              <EditProfile
                userData={localUserData}
                onProfileUpdate={handleProfileUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
