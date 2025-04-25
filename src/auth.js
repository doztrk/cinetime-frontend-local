import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "@/services/auth-service"; // login fonksiyonunu doğru şekilde import et
import { getIsTokenValid, parseJWT } from "./helpers/auth-helper"; // JWT çözümleyici fonksiyon

const config = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("Gelen credentials:", credentials); // Burada loglama yaparak giriş verilerini kontrol et

        const loginData = {
          phoneNumber: credentials.phoneNumber, // phoneNumber'ı doğru şekilde gönder
          password: credentials.password, // password'ı da gönder
        };

        // Backend login fonksiyonu çağrılır
        const res = await login(loginData);

        if (!res.ok) {
          const errorData = await res.json(); // Hata mesajını detaylı şekilde al
          console.log("Login Hatası:", errorData.message); // Backend'den gelen hata mesajını yazdır
          return null;
        }

        const data = await res.json();
        console.log("API Yanıtı:", data); // API yanıtını kontrol et

        const accessToken = data.token;
        if (!accessToken) {
          console.log("Token bulunamadı");
          return null;
        }

        const decoded = parseJWT(accessToken);
        const role = decoded?.role || "user"; // Varsayılan olarak 'user' rolü atanır

        return {
          user: {
            phoneNumber: credentials.phoneNumber,
            role,
          },
          accessToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      const { accessToken, user } = token;
      const isAPITokenValid = getIsTokenValid(accessToken);
      if (!isAPITokenValid) return null;

      session.user = user;
      session.accessToken = accessToken;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
