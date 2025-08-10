import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import LandingPage from "./pages/LandingPage";
import OnBoarding from "./pages/OnBoarding";
import JobListing from "./pages/JobListing";
import JobPage from "./pages/JobPage";
import SavedJobs from "./pages/SavedJobs";
import PostJob from "./pages/PostJob";
import MyJobs from "./pages/MyJobs";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    element: <App />, 
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/login", element: <LoginPage /> },

      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <OnBoarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <JobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute requiredRole="recruiter">
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
