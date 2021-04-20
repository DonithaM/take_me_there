import React, { useState, useContext, createContext, useEffect } from "react";
import usePersistedState from "./hooks/usePersistedState";

export const userContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //fetch
  }, []);

  return <userContext.Provider value={{}}>{children}</userContext.Provider>;
};
