import React, { useState } from "react";
import { Icon } from "./Icon";
import { useSelector } from "react-redux";
import userIcon from "../assets/user.png";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="h-16">
        <div className="mx-auto max-w-6xl flex items-center justify-between h-full">
          <div className="flex items-center">
            <Icon size={32} />
          </div>
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
                  <div className="absolute top-12 right-0 w-48 bg-white shadow-md rounded-md p-2 z-50">
                    <p className="text-md text-gray-500 text-center hover:bg-gray-100 rounded-md">
                      Profile
                    </p>
                    <p className="text-md text-gray-500 text-center hover:bg-gray-100 rounded-md">
                      Settings
                    </p>
                    <p className="text-md text-gray-500 text-center hover:bg-gray-100 rounded-md">
                      Logout
                    </p>
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
