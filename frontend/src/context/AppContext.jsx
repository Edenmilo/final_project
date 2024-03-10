import { createContext, useState } from "react";

export const AppContext = createContext({
  loginData: {},
  setLoginData: () => {},
});

export const ContextProvider = ({ children }) => {
  const [loginData, setLoginData] = useState({});
  const contextValue = {
    loginData,
    setLoginData,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
