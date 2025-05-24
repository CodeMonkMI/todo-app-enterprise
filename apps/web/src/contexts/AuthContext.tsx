import React, { createContext, useContext, useState } from "react";

export type TokenData = {
  id: string;
  role: string;
};

interface AuthState {
  id: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (data: TokenData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const setUserFn = async (data: TokenData) => {
    setIsAuthenticated(Object.keys(data).length > 0);
    setId(data.id);
    setRole(data.role);
  };

  const logout = () => {
    setId(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    isAuthenticated,
    id,
    role,
    logout,
    login: setUserFn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
