import React from "react";
import { Outlet } from "react-router-dom";
import { ResponsiveSidebar } from "../components/responsiveSidebar";
import { Sidebar } from "../components/sidebar";
import { AuthProvider } from "../context/AuthContext";

export function ControlLayout() {
  return (
    <AuthProvider>
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="block lg:hidden">
          <ResponsiveSidebar />
        </div>
        <div className="w-full pl-0 lg:pl-[320px]">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  );
}
