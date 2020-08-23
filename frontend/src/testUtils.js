import React from "react";
import UserContext from "./auth/UserContext";



const UserProvider = ({ children }) => (
  <UserContext.Provider>
    {children}
  </UserContext.Provider>
);

export { UserProvider };
