import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar";

export function ControlLayout() {
  return (
    <div className="">
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
