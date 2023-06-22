import { Route, Routes } from "react-router-dom";
import Login from "../pages/user/Login";
import Signup from "../pages/user/Signup";
import Adminlogin from "../pages/admin/Adminlogin";
import {
  LoggedRoute,
  IsLoggedRoute,
  AdminLoggedRoute,
  AdminIsLoggedRoute,
} from "../middleware/auth";
import LayoutAdmin from "../pages/admin/LayoutAdmin";
import Usermanage from "../pages/admin/Usermanage";
import Layoutuser from "../pages/user/Layoutuser";
import Home from "../pages/user/Home";
import Profile from "../pages/user/Profile";
const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <LoggedRoute>
            <Layoutuser />
          </LoggedRoute>
        }
      >
        <Route index element={<Home/>}></Route>
        <Route path="messages" element={ <h1>messages</h1>}></Route>
        <Route path="create" element={ <h1>create</h1>}></Route>
        <Route path="saved" element={ <h1>saved</h1>}></Route>
        <Route path="settings" element={<h1>settings</h1>}></Route>
        <Route path="profile" element={ <Profile/>}></Route>
      </Route>
      <Route path="*" element={<p>Path not resolved</p>} />
      <Route
        exact
        path="/"
        element={
          <IsLoggedRoute>
            <Login />
          </IsLoggedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <IsLoggedRoute>
            <Signup />
          </IsLoggedRoute>
        }
      />
      <Route
        path="/admin-login"
        exact
        element={
          <AdminIsLoggedRoute>
            <Adminlogin />
          </AdminIsLoggedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminLoggedRoute>
            <LayoutAdmin />
          </AdminLoggedRoute>
        }
      >
        <Route index element={<h1>home</h1>} />
        <Route path="users" element={<Usermanage />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
