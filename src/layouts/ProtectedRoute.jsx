import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../hook/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  if (user) {
    if (location.pathname == "/login") {
      navigate("/");
    } else if (location.pathname == "/register") {
      navigate("/");
    }
  } else {
    if (location.pathname == "/") {
      navigate("/login");
      return;
    }
  }

  if (loading) {
    return (
      <>
        <div className=" flex items-center justify-center h-screen">
          <h1 className=" text-5xl font-bold text-blue-600">Loading.......</h1>
        </div>
      </>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
