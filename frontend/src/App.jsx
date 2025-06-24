import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Feed from "./pages/Feed";
import { Provider } from "react-redux";
import store from "./utils/store";
import ProfilePage from "./pages/Profile";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <div className="p-2 bg-gray-100 min-h-screen flex flex-col">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </Router>
        </div>
      </Provider>
    </>
  );
}
