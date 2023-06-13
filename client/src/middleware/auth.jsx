import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
/* eslint-disable react/prop-types */
export const LoggedRoute = ({ children }) => {
  const user = useSelector(state=>state.user.value)
  if (!user) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};

export const IsLoggedRoute = ({ children }) => {
  const user = useSelector(state=>state.user.value)
  if (user) {
    return <Navigate to={"/home"} replace={true}></Navigate>;
  }
  return children;
};

export const AdminLoggedRoute = ({ children }) => {
  const token = localStorage.getItem("ADMINTOKEN");
  if (!token) {
    return <Navigate to={"/admin-login"} replace={true}></Navigate>;
  }

  return children;
};

export const AdminIsLoggedRoute = ({ children }) => {
  const token = localStorage.getItem("ADMINTOKEN");
  if (token) {
    return <Navigate to={"/admin"} replace={true}></Navigate>;
  }
  return children;
};

