import React from "react";
import Sidebr from "../components/Sidebr";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <main className="flex items-start justify-start">
      <Sidebr />
      <section className="flex-1 h-screen">
        <Outlet />
      </section>
    </main>
  );
};

export default RootLayout;
