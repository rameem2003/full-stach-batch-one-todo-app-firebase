import React, { useContext } from "react";
import { UserContext } from "../hook/useAuth";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";

const UserNav = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleSignout = async () => {
    console.log("Ok");

    await signOut(auth);
    navigate("/login");
  };

  return (
    <section>
      <div className="flex flex-wrap items-center gap-4 cursor-pointer">
        <img
          src={
            user?.photoURL
              ? user.photoURL
              : "https://readymadeui.com/profile.webp"
          }
          className="w-10 h-10 rounded-full border-2 border-white"
        />
        <div>
          <p className="text-sm text-white">{user?.displayName}</p>
          <p className="text-xs text-gray-300 mt-0.5">{user?.email}</p>
        </div>

        <button
          onClick={handleSignout}
          class=" w-full px-5 py-2 rounded-md cursor-pointer text-xl tracking-wider font-medium border-0 outline-0 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-2xl"
        >
          Signout
        </button>
      </div>
    </section>
  );
};

export default UserNav;
