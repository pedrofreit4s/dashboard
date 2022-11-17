import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IAccount } from "../interfaces/IAccount";
import { api } from "../services/api";

interface IAuthContext {
  isAuthenticated: boolean;
  account: IAccount | null;

  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext({} as IAuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<IAccount | null>(null);

  const isAuthenticated = !!account;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("session.token");

    findMe();
  }, [location.pathname]);

  const findMe = useCallback(async () => {
    try {
      const { data } = await api.get("/accounts/me");

      setAccount(data);
    } catch (error) {
      navigate("/");
    }
  }, []);
  const signIn = useCallback(async (email: string, password: string) => {
    const { data } = await api.post("/sessions", { email, password });

    localStorage.setItem("session.token", data.token);
    api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
    await findMe();
  }, []);
  const signOut = useCallback(() => {
    localStorage.clear();
    navigate("/");
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, account, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
