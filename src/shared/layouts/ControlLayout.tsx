import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import { AuthProvider } from "../context/AuthContext";

export function ControlLayout() {
  return (
    <AuthProvider>
      <div className="flex">
        <Sidebar />
        <div className="w-full pl-[320px]">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  );
}
