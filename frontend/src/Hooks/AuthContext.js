// AuthContext.js

import React, { createContext, useState } from 'react';

// Create the AuthContext
export const UserContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userEmail, setUserEmail] = useState('');
  const [name, setname] = useState("");


  return (
    <UserContext.Provider value={{ userEmail, setUserEmail,name, setname}}>
      {children}
    </UserContext.Provider>
  );
};
