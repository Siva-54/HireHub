import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleManageAccount = () => {
    setShowMenu(false);
    navigate("/account");
  };

  return (
    <nav className="py-4 flex justify-between items-center">
      <Link to="/">
        <img src="/logo.png" alt="logo" className="h-40" />
      </Link>

      <div className="flex gap-8 items-center">
        {!user && (
          <Button
            variant="outline"
            className="m-2 p-5 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}

        {user && (
          <>
            {role === "recruiter" && (
              <Link to="/post-job">
                <Button
                  variant="destructive"
                  className="rounded-full cursor-pointer"
                >
                  <PenBox size={20} className="mr-2" /> Post a Job
                </Button>
              </Link>
            )}

            <div className="relative">
              <button
                onClick={() => setShowMenu((s) => !s)}
                className="rounded-full overflow-hidden w-10 h-10"
              >
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt={user.displayName || "user"}
                  className="w-10 h-10 object-cover"
                />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-2 z-50">
                  <button
                    className="w-full text-left p-2 rounded-md hover:bg-gray-800 flex items-center gap-2 text-gray-200"
                    onClick={() => {
                      setShowMenu(false);
                      navigate("/my-jobs");
                    }}
                  >
                    <BriefcaseBusiness size={15} /> My Jobs
                  </button>
                  <button
                    className="w-full text-left p-2 rounded-md hover:bg-gray-800 flex items-center gap-2 text-gray-200"
                    onClick={() => {
                      setShowMenu(false);
                      navigate("/saved-jobs");
                    }}
                  >
                    <Heart size={15} /> Saved Jobs
                  </button>
                  <button
                    className="w-full text-left p-2 rounded-md hover:bg-gray-800 text-gray-200"
                    onClick={handleManageAccount}
                  >
                    Manage Account
                  </button>
                  <div className="border-t border-gray-700 my-2" />
                  <button
                    className="w-full text-left p-2 rounded-md hover:bg-gray-800 text-red-500"
                    onClick={() => {
                      setShowMenu(false);
                      logout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
