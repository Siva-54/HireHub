import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./contexts/AuthContext";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
