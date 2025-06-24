import Navbar from "../components/navbar";
import Header from "../components/Header";
import { BASE_API_URL } from "../constants/url";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user);

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

  useEffect(() => {
    fetchUser();
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <Header />
      </div>
    </>
  );
};

export default Home;
