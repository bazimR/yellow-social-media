import { Routes, Route } from "react-router-dom";
import Adminlogin from "../pages/admin/Adminlogin";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<Adminlogin />} exact path="/admin">
        
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
