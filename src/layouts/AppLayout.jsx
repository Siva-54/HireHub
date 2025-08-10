import Header from "@/components/Header";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";

const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="relative">
      <div className="grid-background"></div>
      <main className="min-h-screen container relative">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">
        Lets support together for better future.
      </div>

      {isLoginPage && <LoginPage />}
    </div>
  );
};

export default AppLayout;
