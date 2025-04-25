"use client";
import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { UserMenuAuth } from "./user-menu-auth";
import { UserMenuGuest } from "./user-menu-guest";
import { getIsTokenValid } from "@/helpers/auth-helper";

export const UserMenu = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session:", session); // Debugging session data

    if (session?.accessToken) {
      // Token geçerliliğini kontrol et
      const tokenIsValid = getIsTokenValid(session.accessToken);
      if (!tokenIsValid) {
        // Token geçersizse kullanıcıyı çıkartıyoruz
        signOut({ callbackUrl: "/login" }); // Sayfa yönlendirmesi yapılacak
      }
    }
  }, [session]);

  if (status === "loading") {
    return <span>Loading...</span>; // Show loading indicator during session loading
  }

  if (session?.user) {
    console.log("Authenticated User:", session.user);
    return (
      <UserMenuAuth
        user={session.user}
        logout={() => signOut({ callbackUrl: "/login" })}
      />
    );
  }

  return <UserMenuGuest />;
};
