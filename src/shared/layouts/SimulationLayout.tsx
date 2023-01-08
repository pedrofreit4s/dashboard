import React from "react";
import { Outlet } from "react-router-dom";
import { ResponsiveSidebar } from "../components/responsiveSidebar";
import { Sidebar } from "../components/sidebar";
import { AuthProvider } from "../context/AuthContext";

export function SimulationLayout() {
  return (
    <AuthProvider>
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="block lg:hidden">
          <ResponsiveSidebar />
        </div>
        <div className="w-full px-6 lg:pl-[320px] bg-simulation-bg h-screen overflow-auto">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  );
}
