import React, { useState } from "react";
import { Icon } from "./Icon";
import { useSelector, useDispatch } from "react-redux";
import userIcon from "../assets/user.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL } from "../constants/url";
import { toast } from "sonner";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(removeUser());
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="h-16">
        <div className="mx-auto max-w-6xl flex items-center justify-between h-full">
          <Link to="/">
            <Icon size={32} />
          </Link>
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-4 relative">
                <h2 className="text-md text-gray-500">
                  Welcome, {user?.firstName}
                </h2>

                <div className="relative">
                  <img
                    src={user?.photoUrl}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                </div>
                {isOpen && (
                  <div className="absolute top-12 right-0 w-48 bg-white shadow-md rounded-md p-2 z-50 flex flex-col gap-2">
                    <Link
                      to="/profile"
                      className="text-md text-gray-500 text-center hover:bg-gray-100 rounded-md"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="text-md text-gray-500 text-center hover:bg-gray-100 rounded-md"
                    >
                      Settings
                    </Link>
                    <Link
                      onClick={handleLogout}
                      className="text-md text-gray-500 text-center hover:bg-gray-100 rounded-md"
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <img
                src={userIcon}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
