import { useState, useContext, createContext } from "react";
import { useLoginMutation } from "../api/loginApi";
import { jwtDecode } from "jwt-decode";
import { User } from "./types";

export const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: { children: any }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [loading, setLoading] = useState(false);

  const [login] = useLoginMutation();

  const signin = async (data: any) => {
    setLoading(true);
    const res = await login(data);
    setLoading(false);
    if ((res as any).error?.data) {
      throw (res as any).error?.data;
    }
    if ((res as any).data) {
      const user = (res as any).data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    }
  };

  const signout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAdmin = (data: User | null = user) => {
    if (!data?.access_token) {
      return;
    }
    const role = jwtDecode<{ role: string }>(data?.access_token).role;
    return role === "Admin";
  };

  return {
    user,
    loading,
    signin,
    signout,
    isAdmin: isAdmin(user),
  };
};
