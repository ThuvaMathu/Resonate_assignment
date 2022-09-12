import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [contactData, setContactData] = useState();
  return (
    <AppContext.Provider
      value={{
        contactData,
        setContactData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useProvider = () => useContext(AppContext);

export default AppProvider;
