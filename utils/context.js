import React, { createContext, useContext, useState, useEffect } from "react";

export const ContextDataCreate = createContext();

// Provider
export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
//   console.log(token);
  

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const setAndStoreToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <ContextDataCreate.Provider value={{ token, setAndStoreToken, clearToken }}>
      {children}
    </ContextDataCreate.Provider>
  );
};

export const ContextData = () => useContext(ContextDataCreate);
