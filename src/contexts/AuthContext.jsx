import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, provider, db } from "../firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  getIdToken
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get or create user in Firestore 
  const fetchOrCreateUser = async (fbUser) => {
    if (!fbUser?.uid) return;

    try {
      const userRef = doc(db, "users", fbUser.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const fetchedRole = snap.data().role || "recruiter";
        setRole(fetchedRole);
        return fetchedRole;
      } else {
        await setDoc(userRef, {
          uid: fbUser.uid,
          email: fbUser.email || null,
          name: fbUser.displayName || null,
          photoURL: fbUser.photoURL || null,
          role: "recruiter",
          createdAt: serverTimestamp()
        });
        setRole("recruiter");
        return "recruiter";
      }
    } catch (err) {
      console.error("Error fetching/creating user doc:", err);
      setRole(null);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setUser(fbUser);
        await fetchOrCreateUser(fbUser);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate("/onboarding");
    } catch (err) {
      console.error("Google sign-in error:", err);
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const getToken = async (forceRefresh = false) => {
    if (!auth.currentUser) return null;
    return await getIdToken(auth.currentUser, forceRefresh);
  };

  return (
    <AuthContext.Provider
      value={{ user, role, loading, setRole, loginWithGoogle, logout, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
