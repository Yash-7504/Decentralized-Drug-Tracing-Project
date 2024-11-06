import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password, role) => {
    // Implement your login logic here
    // For now, we'll just set a dummy user
    setUser({ email, role });
  };

  const register = async (email, password, role) => {
    // Implement your registration logic here
    // For now, we'll just set a dummy user
    setUser({ email, role });
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
