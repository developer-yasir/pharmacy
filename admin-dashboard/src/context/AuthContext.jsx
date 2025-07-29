import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false); // Always false as no async auth

  useEffect(() => {
    // Automatically set a dummy admin user and token for direct access
    const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YjQ1YjQ1YjQ1YjQ1YjQ1YjQ1YjQiLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.dummy_admin_token'; // A static, non-expiring dummy token
    const dummyUser = { isAuthenticated: true, role: 'admin', username: 'Admin', email: 'admin@example.com' };

    setToken(dummyToken);
    setUser(dummyUser);
    axios.defaults.headers.common['x-auth-token'] = dummyToken;

    // No actual login/logout needed for this setup
  }, []);

  // Dummy login/logout functions (no-op)
  const login = async () => { return true; };
  const logout = () => {
    toast.info('Admin logged out (dummy).');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
