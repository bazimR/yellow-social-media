import { BrowserRouter } from "react-router-dom";

import UserRoutes from "./UserRoutes";

const Router = () => {
  return (
    <BrowserRouter>
        <UserRoutes />
    </BrowserRouter>
  );
};

export default Router;
