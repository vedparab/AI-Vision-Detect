import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import History from "./pages/History";
import Profile from "./pages/Profile";
function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
          <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
        }
      />
      <Route 
        path="/profile" 
        element={<Profile />} 
      />
    </Routes>
  );
}

export default App;