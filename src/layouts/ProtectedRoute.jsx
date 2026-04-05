import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase.config";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getUserInfo = () => {
    if (user) {
      if (location.pathname == "/login") {
        navigate("/");
      } else if (location.pathname == "/register") {
        navigate("/");
      }

      // ...
    } else {
      if (location.pathname == "/") {
        navigate("/login");
        return;
      }
      // User is signed out
      // ...
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [user, loading]);

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
