import React from "react";
import { Icon } from "./Icon";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { API_URL } from "../constants/url";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailId, setEmailId] = useState("rithvik@gmail.com");
  const [password, setPassword] = useState("rithvik@123");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailId || !password) {
      toast.error("Please enter your email and password");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(response.data.data));
      toast.success("Login successful", {
        description: "Redirecting to dashboard...",
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setEmailId("");
      setPassword("");
      setIsLoading(false);
      navigate("/feed");
    }
  };

  return (
    <>
      <div className="w-full max-w-sm mx-auto mt-26">
        <div className="flex flex-col w-full gap-2 justify-center items-center mb-10">
          <Icon size={42} />
          <p className="text-2xl text-gray-900 tracking-tighter font-light">
            Login to Luna
          </p>
        </div>
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}
        <form className="w-full flex flex-col gap-4">
          <div className="p-2 space-y-4">
            <div className="flex flex-col w-full gap-2">
              <label className="text-gray-900 font-light text-sm">Email</label>
              <input
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                type="email"
                placeholder="Enter your email address"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all duration-200 placeholder-gray-400"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-gray-900 font-light text-sm">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all duration-200 placeholder-gray-400"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <button
                onClick={handleLogin}
                className="w-full bg-gray-900 text-white rounded-md py-2.5 font-light hover:bg-gray-800 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
