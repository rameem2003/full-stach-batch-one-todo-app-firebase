import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase.config";
import { useLocation, useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(null);
  const [loading, setLoading] = useState(false);
  const getUserInfo = () => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // console.log(user);
        if (location.pathname == "/login") {
          navigate("/");
        } else if (location.pathname == "/register") {
          navigate("/");
        }

        // ...
      } else {
        console.log("ok");

        setLoading(false);
        if (location.pathname == "/") {
          navigate("/login");
          return;
        }
        // User is signed out
        // ...
      }
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
