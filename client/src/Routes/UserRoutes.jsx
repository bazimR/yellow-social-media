import { Route, Routes } from "react-router-dom";
import Login from "../pages/user/Login";
import Signup from "../pages/user/Signup";
import Otp from "../pages/user/Otp";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>home</div>} />
      <Route path="*" element={<p>Path not resolved</p>} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="otp" element={<Otp />} />
    </Routes>
  );
};

export default UserRoutes;
