import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Requests from "../components/requests";
import { useSelector, useDispatch } from "react-redux";
import { BASE_API_URL } from "../constants/url";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const RequestsPage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchUser = async () => {
    if (user) return;
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

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/user/requests/received`,
        {
          withCredentials: true,
        }
      );
      setRequests(response.data.data);
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/login");
      } else {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchRequests();
  }, []);

  // Show loading state while fetching user data
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Requests requests={requests} />
    </>
  );
};

export default RequestsPage;
