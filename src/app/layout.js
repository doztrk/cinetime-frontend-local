import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { AuthProvider } from "@/context/AuthContext";
import { me } from "@/services/auth-service";
import { getCookie } from "@/helpers/server";

export const metadata = {
  title: "Cinema Website",
  description: "Your ultimate cinema experience",
};

export default async function RootLayout({ children, session }) {
  const authToken = (await getCookie("authToken")) || null;
  let user = null;
  let isAuthenticated = false;
  try {
    const meReq = await me(authToken);
    const res = await meReq.json();
    if (!res.error) {
      user = res;
      isAuthenticated = true;
    }
  } catch (err) {}

  return (
    <html lang="en">
      <body>
        <AuthProvider
          user={user}
          isAuthenticated={isAuthenticated}
          authToken={authToken}
        >
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
