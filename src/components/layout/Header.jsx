"use client";
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Link from "next/link";
import "./Header.scss";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import navItems from "@/helpers/data/navbar-items.json";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <Navbar expand="md" bg="dark" variant="dark" className="header py-2">
      <Container
        fluid
        className="header-container d-flex justify-content-between align-items-center"
      >
        <Navbar.Brand className="d-flex align-items-center">
          <Link href="/" className="logo-link">
            <Image
              src="/images/logos/cinemalogo 1.png"
              width={150}
              height={58}
              alt="Cinema Logo"
              className="logo"
              priority
            />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-items w-100 d-md-flex justify-content-between align-items-center">
            <div className="d-md-flex flex-wrap align-items-center">
              {navItems.map((item) => (
                <Nav.Link as="div" key={item.id}>
                  <Link href={item.link} className="navLink">
                    {item.label}
                  </Link>
                </Nav.Link>
              ))}
            </div>

            <div className="seperate-buttons mt-3 mt-md-0">
              {isAuthenticated() ? (
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <span className="me-2 text-white">
                    Welcome, {user?.name || "User"}
                  </span>
                  <button
                    onClick={logout}
                    className="btn btn-outline-light btn-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
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
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
