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
        console.log("Gelen credentials:", credentials);

        const loginData = {
          phoneNumber: credentials.phoneNumber,
          password: credentials.password,
        };

        const res = await login(loginData);

        if (!res.ok) {
          const errorData = await res.json();
          console.log("Login Hatası:", errorData.message);
          return null; // Hata durumunda kullanıcıyı null döndürüyoruz
        }

        const data = await res.json();
        console.log("API Yanıtı:", data);

        const accessToken = data.token;
        if (!accessToken) {
          console.log("Token bulunamadı");
          return null; // Token yoksa null dönüyoruz
        }

        const decoded = parseJWT(accessToken);
        const role = decoded?.role || "user";

        // 'Bearer ' kısmını çıkarıyoruz
        return {
          user: {
            phoneNumber: credentials.phoneNumber,
            role,
          },
          accessToken: accessToken.replace("Bearer ", ""), // Bearer kısmını temizliyoruz
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Eğer yeni login olmuşsa user objesi doludur
      if (user) {
        token.phoneNumber = user.phoneNumber ?? user.sub; // phoneNumber varsa al, yoksa sub'dan al
        token.role = user.role || "user";
        token.accessToken = user.accessToken;
      } else if (token.sub && !token.phoneNumber) {
        // Refresh gibi durumlarda sub'ı phoneNumber olarak kullan
        token.phoneNumber = token.sub;
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
    signIn: "/login", // Giriş sayfası yönlendirmesi
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
