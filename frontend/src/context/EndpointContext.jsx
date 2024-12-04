import React, { createContext, useContext, useState } from "react";

const EndpointContext = createContext();

export const EndpointProvider = ({ children }) => {
  const [currentEndpoint, setCurrentEndpoint] = useState("");

  return (
    <EndpointContext.Provider value={{ currentEndpoint, setCurrentEndpoint }}>
      {children}
    </EndpointContext.Provider>
  );
};

export const useEndpoint = () => useContext(EndpointContext);
