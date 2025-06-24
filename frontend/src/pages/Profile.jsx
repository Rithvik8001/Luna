import React, { useEffect } from "react";
import Profile from "../components/profile";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL } from "../constants/url";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      if (userData) return;
      try {
        const response = await axios.get(`${BASE_API_URL}/profile`, {
          withCredentials: true,
        });
        dispatch(addUser(response.data.data));
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
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <Profile />
      </div>
    </>
  );
};

export default ProfilePage;
