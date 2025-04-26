"use client";
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import navItems from "@/helpers/data/navbar-items.json";
import { UserMenu } from "./user-menu";
import "./Header.scss";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar expand="md" variant="dark" className="header fixed-top">
      <Container
        fluid
        className={`header-container d-flex justify-content-between align-items-center ${
          isScrolled ? "scrolled" : ""
        }`}
        id="header-container"
      >
        {/* Sol kısım: Logo */}
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

        {/* Mobilde hamburger butonu */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Menü ve Butonlar */}
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="nav-area d-md-flex justify-content-between align-items-center w-100">
            {/* Menü Linkleri */}
            <Nav className="d-md-flex flex-wrap align-items-center">
              {navItems.map((item) => (
                <Nav.Link as="div" key={item.id}>
                  <Link href={item.link} className="navLink">
                    {item.label}
                  </Link>
                </Nav.Link>
              ))}
            </Nav>

            {/* Sağ Butonlar */}
            <div className="seperate-buttons d-flex align-items-center mt-3 mt-md-0">
              <UserMenu />
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
