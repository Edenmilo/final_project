import { createContext, useState } from "react";

export const AppContext = createContext({
  loggedPerson: {},
  setLoggedPerson: () => {},

});

export const ContextProvider = ({ children }) => {
  const [loggedPerson, setLoggedPerson] = useState({});
  const contextValue = {
    loggedPerson,
    setLoggedPerson,
    
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
