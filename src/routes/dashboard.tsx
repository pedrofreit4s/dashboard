import React from "react";
import { createHashRouter } from "react-router-dom";
import { AuthenticatePage } from "../pages/auth";
import { AccountsPage } from "../pages/control/accounts";
import { ControlLayout } from "../shared/layouts/ControlLayout";

const dashboardRoutes = createHashRouter([
  {
    path: "/",
    element: <AuthenticatePage />,
  },
  {
    path: "/control",
    element: <ControlLayout />,
    children: [
      {
        path: "accounts",
        element: <AccountsPage />,
      },
    ],
  },
]);

export { dashboardRoutes };
