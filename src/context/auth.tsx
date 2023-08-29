import { createContext, useEffect } from "react";
import { useState } from "react";
import { api } from "../services/api";

interface AuthProviderProps{
    children: React.ReactNode
}
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const loadingStoreData = async () => {
        const storageUser = localStorage.getItem("@Auth.user");
        const storageToken = localStorage.getItem("@Auth:token");
    
        if(storageUser && storageToken) {
            setUser(storageUser);
        }
      };
      loadingStoreData();
     }, [])

  

  const signIn = async ({ email, password }) => {
    const response = await api.post("/auth", {
      email,
      password,
    });

    if (response.data.error) {
      alert(response.data.error);
    } else {
      setUser(response.data);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      localStorage.setItem("@Auth:token", response.data.token);
      localStorage.setItem("@Auth:user", response.data.user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
