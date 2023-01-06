import React from "react";
import { RouteObject } from "react-router-dom";
import { AuthenticatePage } from "../pages/auth";

const authRoutes: RouteObject = {
  path: "/",
  element: <AuthenticatePage />,
};

export { authRoutes };
