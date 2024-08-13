import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import LocalAuthority from "./scenes/local Authority/manageLocalAuthority";
import AddLocalAuthority from "./scenes/local Authority/addLocalAuthority";
import EditLocalAuthority from "./scenes/local Authority/edit";
import Users from "./scenes/users/manageUser";
import Login from "./scenes/login";

function App() {
  const [theme, colorMode] = useMode();

  const login = true; // This would be replaced with your actual login state logic

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {login ? (
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/local_authority" element={<LocalAuthority />} />
                <Route
                  path="/local_authority/add"
                  element={<AddLocalAuthority />}
                />
                <Route
                  path="/local_authority/edit/:lid"
                  element={<EditLocalAuthority />}
                />
                <Route path="/users" element={<Users />} />

                {/* Redirect to dashboard if logged in */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        ) : (
          <Routes>
            {/* If not logged in, redirect to login page */}
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
