import { isAuthenticated } from "@/utils/auth";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = (): JSX.Element => {
  if (!isAuthenticated()) {
    return <Navigate to={"/auth/login"} />;
  }
  return <Outlet />;
};

export const LoggedInRoutes = (): JSX.Element => {
  if (isAuthenticated()) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};
