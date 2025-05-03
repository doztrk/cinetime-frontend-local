// src/app/layout.js
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { SessionProvider } from "next-auth/react"; // 👈 this is correctly added
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export const metadata = {
  title: "Cinema Website",
  description: "Your ultimate cinema experience",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Header />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
