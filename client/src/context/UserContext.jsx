import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('pharmacy_username') || '';
  });

  useEffect(() => {
    localStorage.setItem('pharmacy_username', username);
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
