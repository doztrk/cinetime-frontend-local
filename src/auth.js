import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "@/services/auth-service";
import { getIsTokenValid, parseJWT } from "./helpers/auth-helper";

const config = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const loginData = {
          phoneNumber: credentials.phoneNumber,
          password: credentials.password,
        };

        const res = await login(loginData);
        const data = await res.json();
        if (!res.ok) {
          return null;
        }

        const payload = {
          user: { ...data },
          accessToken: data.token,
        };
        delete payload.user.token;

        return payload;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("TOKEN:", token);
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },

    async session({ session, token }) {
      console.log("Session Callback - Token:", token);

      const { accessToken, phoneNumber, role } = token;
      const isAPITokenValid = getIsTokenValid(accessToken);
      if (!isAPITokenValid) {
        console.log("Token geçersiz.");
        return null;
      }

      session.user = {
        phoneNumber: phoneNumber || token.sub || null,
        role: role || "user",
      };

      session.accessToken = accessToken || null;

      console.log("Session Callback - Session:", session);
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
