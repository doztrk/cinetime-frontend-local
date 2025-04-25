"use client";
import React from "react";
import { Button } from "react-bootstrap";

export const UserMenuAuth = ({ user, logout }) => {
  return (
    <div className="d-flex align-items-center flex-wrap gap-2">
      <span className="me-2 text-white">Welcome, {user?.name || "User"}</span>
      <Button onClick={logout} className="btn-success">
        Logout
      </Button>
    </div>
  );
};
