import React, { createContext, useContext, useEffect, useState } from "react";
import { router, useSegments } from "expo-router";
import { tokenStorage, userStorage } from "@/api";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  signIn: (token: string, user: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  signIn: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const segments = useSegments();

  // Verificar autenticación al iniciar
  useEffect(() => {
    checkAuth();
  }, []);

  // Proteger rutas basado en autenticación
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup =
      segments[0] === "(tabs)" ||
      segments[0] === "gestionar-mascotas" ||
      segments[0] === "modal";

    if (!isAuthenticated && inAuthGroup) {
      // Usuario no autenticado intentando acceder a rutas protegidas
      router.replace("/login");
    } else if (
      isAuthenticated &&
      !inAuthGroup &&
      segments[0] !== "register" &&
      segments[0] !== "register-options"
    ) {
      // Usuario autenticado en pantalla de login
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, segments, isLoading]);

  const checkAuth = async () => {
    try {
      const token = await tokenStorage.getToken();
      const userData = await userStorage.getUser();

      if (token && userData) {
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (token: string, userData: any) => {
    try {
      await tokenStorage.setToken(token);
      await userStorage.setUser(userData);
      setIsAuthenticated(true);
      setUser(userData);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await tokenStorage.removeToken();
      await userStorage.removeUser();
      setIsAuthenticated(false);
      setUser(null);
      router.replace("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
