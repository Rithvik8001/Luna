import React, { useEffect } from "react";
import UserFeed from "../components/user-feed";
import axios from "axios";
import { BASE_API_URL } from "../constants/url";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Navbar from "../components/navbar";
import { addUser } from "../utils/userSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const user = useSelector((state) => state.user);

  const getFeed = async () => {
    if (feed) return;
    try {
      const response = await axios.get(`${BASE_API_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    if (user) return;
    const response = await axios.get(`${BASE_API_URL}/profile`, {
      withCredentials: true,
    });
    dispatch(addUser(response.data.data));
  };

  useEffect(() => {
    getFeed();
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <UserFeed feed={feed} />
    </>
  );
};

export default Feed;
