import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
