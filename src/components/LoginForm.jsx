import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = ({ onClose }) => {
  const { loginWithGoogle, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      if (onClose) onClose();
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    console.log("Email login:", { email, password });
    // TODO: Add email/password login integration
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Log in
      </h2>

      {/* Email/Password Form */}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Log in now
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <hr className="flex-grow border-gray-300 dark:border-gray-700" />
        <span className="mx-3 text-gray-500 text-sm">Or continue with</span>
        <hr className="flex-grow border-gray-300 dark:border-gray-700" />
      </div>

      {/* Google Button */}
      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="20"
          height="20"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.61l6.85-6.85C35.18 2.71 29.91 0 24 0 14.62 0 6.35 5.82 2.69 14.09l7.98 6.19C12.35 14.41 17.77 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.5 24.5c0-1.61-.14-3.16-.39-4.66H24v9.16h12.7c-.54 2.94-2.15 5.44-4.55 7.12l7.09 5.5C43.54 37.14 46.5 31.25 46.5 24.5z"
          />
          <path
            fill="#FBBC05"
            d="M10.67 28.28c-1.22-3.54-1.22-7.35 0-10.89l-7.98-6.19C-.95 16.46-.95 32.54 2.69 39.91l7.98-6.19z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.91-2.15 15.87-5.84l-7.09-5.5c-2.02 1.36-4.6 2.16-7.78 2.16-6.23 0-11.65-4.91-13.33-11.41l-7.98 6.19C6.35 42.18 14.62 48 24 48z"
          />
        </svg>
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>

      {/* Links */}
      <div className="mt-6 text-center text-sm">
        <a href="/register" className="text-blue-600 hover:underline">
          Create new account
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
