import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios'; // No longer needed for authentication
// import { toast } from 'react-toastify'; // No longer needed for authentication toasts

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // For the main client, user is now determined by username in UserContext
  // We keep a dummy user object for compatibility with PrivateRoute if needed
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Always false as no async auth

  // Dummy login/register/logout functions
  const login = async () => { return true; };
  const register = async () => { return true; };
  const logout = () => {};

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;