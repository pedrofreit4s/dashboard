import React from "react";
import { createHashRouter } from "react-router-dom";
import { AuthenticatePage } from "../pages/auth";

const dashboardRoutes = createHashRouter([
  {
    path: "/auth",
    element: <AuthenticatePage />,
  },
]);

export { dashboardRoutes };
