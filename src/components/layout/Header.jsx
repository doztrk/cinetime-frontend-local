"use client";
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Link from "next/link";
import "./Header.scss";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <Navbar expand="md" bg="dark" variant="dark" className="header">
      <Container>
        <Navbar.Brand>
          <Link href="/">
            <Image
              src="/images/cinema-logo.png"
              width={150}
              height={58}
              alt="Cinema Logo"
            />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex justify-content-center w-100">
            <Nav.Link as="div">
              <Link href="/" className="navLink">
                Ana Sayfa
              </Link>
            </Nav.Link>
            <Nav.Link as="div">
              <Link href="/movies" className="navLink">
                Filmler
              </Link>
            </Nav.Link>
            <Nav.Link as="div">
              <Link href="/events" className="navLink">
                Etkinlikler
              </Link>
            </Nav.Link>
            <Nav.Link as="div">
              <Link href="/events" className="navLink">
                Sinema Salonları
              </Link>
            </Nav.Link>
            <Nav.Link as="div">
              <Link href="/events" className="navLink">
                Kampanyalar
              </Link>
            </Nav.Link>

            <div className="seperate-buttons">
              {isAuthenticated() ? (
                <div className="d-flex align-items-center">
                  <span className="me-3">Welcome, {user?.name || "User"}</span>
                  <button
                    onClick={logout}
                    className="btn btn-outline-light btn-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Button as="div" className="header-btn login-btn">
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
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
