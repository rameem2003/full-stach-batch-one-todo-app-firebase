import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router";
import { auth } from "../config/firebase.config";

const Home = () => {
  // const navigate = useNavigate();
  // const handleSignout = () => {
  //   signOut(auth).then(() => {
  //     // Sign-out successful.
  //     navigate("/login");
  //   });
  // };
  return <div>{/* <button onClick={handleSignout}>Signout</button> */}</div>;
};

export default Home;
