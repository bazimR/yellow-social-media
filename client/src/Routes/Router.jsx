import { BrowserRouter } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
const Router = () => {
  return (
    <BrowserRouter>
      <UserRoutes />
      <AdminRoutes />
    </BrowserRouter>
  );
};

export default Router;
