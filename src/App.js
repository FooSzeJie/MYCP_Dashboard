import React, { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";

import AdminRoutes from "./routes/admin_route";
import Login from "./scenes/login";

function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token and expiration on initial load
    const token = localStorage.getItem("authToken");
    const expirationTime = localStorage.getItem("authTokenExpiration");

    if (token && expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        // Token expired
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenExpiration");
        setIsAuthenticated(false);
      } else {
        // Token is still valid
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    // Set token expiration (e.g., 1 hour)
    // 1 Minutes = 60000 milliseconds
    const expirationTime = new Date().getTime() + 3600000; // 1 hour in milliseconds
    localStorage.setItem("authTokenExpiration", expirationTime);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiration");
    setIsAuthenticated(false);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isAuthenticated ? (
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar onLogout={handleLogout} />
              <AdminRoutes />
            </main>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
