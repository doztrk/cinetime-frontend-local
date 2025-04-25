"use client";
import React from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";

export const UserMenuGuest = () => {
  return (
    <>
      <Button as="div" className="header-btn login-btn me-2">
        <Link href="/login" className="navLink">
          Giriş Yap
        </Link>
      </Button>
      <Button as="div" className="header-btn register-btn">
        <Link href="/register" className="navLink">
          Hesap Oluştur
        </Link>
      </Button>
    </>
  );
};
