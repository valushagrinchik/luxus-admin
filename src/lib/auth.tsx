import { useState, useContext, createContext } from "react";
import { useLoginMutation } from "../api/loginApi";
import { User } from "../types";

const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: { children: any }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem('user')||"{}"))
  const [loading, setLoading] = useState(false)

  const [login] = useLoginMutation()

  const signin = async (data: any) => {
    setLoading(true)
    const res = await login(data)
    setLoading(false)
    if((res as any).error?.data){
      throw (res as any).error?.data
    }
    if((res as any).data){
      const user = (res as any).data
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      return user
    }
  }

  const signout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return {
    user,
    loading,
    signin,
    signout,
  };
}
