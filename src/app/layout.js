// src/app/layout.js
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Cinema Website",
  description: "Your ultimate cinema experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
