import React from "react";
import LoginForm from "../components/login-form";

const Login = () => {
  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100 rounded-lg">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
