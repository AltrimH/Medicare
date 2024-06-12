import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";

import Layout from "./scenes/layout/index.jsx";
import Login from "./scenes/login";
import Dashboard from "./scenes/dashboard";
import Overview from "./scenes/overview";
import Doctors from "./scenes/doctors";
import Clients from "./scenes/clients";
import Users from "./scenes/users";
import Appointments from "./scenes/appointments";
import Reviews from "./scenes/reviews";
import Contacts from "./scenes/contacts";
import Admin from "./scenes/admin";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import SingleDoctor from "./scenes/doctors/singleDoctor";
import CreateDoctor from './scenes/doctors/createDoctor'

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <ProtectedRoute allowedRoles={["admin", "superadmin"]}> */}
            <Routes>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/:id" element={<SingleDoctor />} />
                <Route path="/doctors/add-doctor" element={<CreateDoctor />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/users" element={<Users />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/admin" element={<Admin />} />
              </Route>
            </Routes>
          {/* </ProtectedRoute> */}
          {/* <Routes>
            <Route path="/login" element={<Login />} />
          </Routes> */}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
