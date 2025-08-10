import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const OnBoarding = () => {
  const { user, role, setRole, loading } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  // If role already exists, skip onboarding
  useEffect(() => {
    if (!loading && role) {
      navigate(role === "recruiter" ? "/post-job" : "/jobs");
    }
  }, [loading, role, navigate]);

  const handleRoleSelection = async (selectedRole) => {
    if (!user?.uid) return;
    setSaving(true);
    try {
      await setDoc(
        doc(db, "users", user.uid),
        { role: selectedRole },
        { merge: true }
      );
      setRole(selectedRole);
      navigate(selectedRole === "recruiter" ? "/post-job" : "/jobs");
    } catch (error) {
      console.error("Error updating user role:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading || saving) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d399" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="text-7xl sm:text-8xl font-extrabold bg-gradient-to-br from-gray-500 via-gray-200 to-white bg-clip-text text-transparent tracking-tighter">
        I am a...
      </h2>

      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="cursor-pointer h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="cursor-pointer h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default OnBoarding;
