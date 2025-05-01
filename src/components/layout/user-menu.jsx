"use client";
import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { UserMenuAuth } from "./user-menu-auth";
import { UserMenuGuest } from "./user-menu-guest";
import { getIsTokenValid } from "@/helpers/auth-helper";

export const UserMenu = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      const tokenIsValid = getIsTokenValid(session.accessToken);
      if (!tokenIsValid) {
        signOut({ callbackUrl: "/login" });
      }
    }
  }, [session]);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (session?.user) {
    return (
      <UserMenuAuth
        user={session.user}
        logout={() => signOut({ callbackUrl: "/login" })}
      />
    );
  }

  return <UserMenuGuest />;
};
