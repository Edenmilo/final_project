import { createContext, useState } from "react";

export const AppContext = createContext({
  userData: {},
  setUserData: () => {},
});

export const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const contextValue = {
    userData,
    setUserData,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
