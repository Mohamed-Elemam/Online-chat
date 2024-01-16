import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!localStorage.getItem("userToken")) {
    return <Navigate to={"/login"} />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
