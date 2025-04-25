"use client";
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import "./Header.scss";
import Image from "next/image";
import navItems from "@/helpers/data/navbar-items.json";
import { UserMenu } from "./user-menu"; // UserMenu import

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
              <UserMenu /> {/* UserMenu burada render ediliyor */}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
