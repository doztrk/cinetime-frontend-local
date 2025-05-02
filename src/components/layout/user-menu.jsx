"use client";
import { UserMenuAuth } from "./user-menu-auth";
import { UserMenuGuest } from "./user-menu-guest";
import { useAuth } from "@/context/AuthContext";
import { logoutAction } from "@/actions/auth-action";
import { useRouter } from "next/navigation";

export const UserMenu = () => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    return (
      <UserMenuAuth
        user={user}
        logout={() => {
          logoutAction();
          router.refresh();
          router.push("/");
        }}
      />
    );
  }

  return <UserMenuGuest />;
};
