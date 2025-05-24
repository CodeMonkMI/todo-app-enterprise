import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoute } from "./components/router/AuthRoute";
import { ProtectedRoute } from "./components/router/ProtectedRoute";
import { TokenData, useAuth } from "./contexts/AuthContext";
import { authToken } from "./lib/token/AuthToken";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Users from "./pages/Users";

const App = () => {
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = authToken.get();
    if (token) {
      const user = authToken.decode(token) as TokenData;
      if (user) {
        login(user);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
