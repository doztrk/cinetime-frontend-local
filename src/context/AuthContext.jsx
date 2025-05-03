"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getCookie } from "@/helpers/client";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  authToken: null,
});

export function AuthProvider({
  children,
  user = null,
  isAuthenticated = false,
  authToken = null,
}) {
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        authToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
