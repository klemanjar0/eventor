"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import * as authApi from "./api";
import { AuthUser, LoginDto, RegisterDto } from "./types";
import { transformApiResponseToUser } from "@/features/auth/utility";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loadUserData = async () => {
    try {
      const response = await authApi.me();

      if (!response) {
        setUser(null);
        return;
      }

      const user = transformApiResponseToUser(response);
      setUser(user);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Skip loading user data on public pages
        const publicPaths = ["/login", "/register"];
        const isPublicPage =
          typeof window !== "undefined" &&
          publicPaths.includes(window.location.pathname);

        if (!user && !isPublicPage) {
          await loadUserData();
        }
      } catch (err) {
        console.error("Failed to initialize auth:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginDto) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await authApi.login(credentials);

      const user = transformApiResponseToUser(response);
      setUser(user);
      router.push("/");
    } catch (err: any) {
      const errorMessage =
        err.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterDto) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await authApi.register(data);

      if (!response.success) {
        return;
      }

      router.push("/login");
    } catch (err: any) {
      const errorMessage =
        err.message || "Registration failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authApi.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
