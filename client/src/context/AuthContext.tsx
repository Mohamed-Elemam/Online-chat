import React, { ReactNode, createContext, useEffect, useState } from "react";

export type User = {
  userId: string;
  username: string;
  email: string;
};

export type AuthContent = {
  token: string | null;
  userId: string | null;
  username: string | null;
  email: string | null;
  setUserState?: React.Dispatch<React.SetStateAction<AuthContent>>;
};
export const AuthContext = createContext<AuthContent>({
  token: null,
  userId: null,
  username: null,
  email: null,
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userState, setUserState] = useState<AuthContent>({
    token: null,
    userId: null,
    username: null,
    email: null,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserState(JSON.parse(user));
      // console.log(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...userState, setUserState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
