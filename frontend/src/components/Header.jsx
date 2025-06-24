import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white relative rounded-2xl mt-2">
        {/* 30x30 Grid Background */}
        <div className="absolute inset-0 grid grid-cols-30 grid-rows-30 opacity-14">
          {Array.from({ length: 900 }, (_, i) => (
            <div key={i} className="border border-gray-300"></div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-2xl mx-auto text-center px-8">
          <h1 className="text-7xl font-black text-gray-900 tracking-tight mb-4">
            Luna
          </h1>
          <p className="text-xl text-gray-600 mb-8 font-light">
            Connect with developers who share your coding style, tech stack, and
            project vision. Build amazing things together.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg cursor-pointer"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
