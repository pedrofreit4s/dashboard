import React from "react";
import { createHashRouter } from "react-router-dom";
import { AuthenticatePage } from "../pages/auth";
import { AccountsPage } from "../pages/control/accounts";
import { CoinsPage } from "../pages/control/coins";
import { ControlLayout } from "../shared/layouts/ControlLayout";

const dashboardRoutes = createHashRouter([
  {
    path: "/",
    element: <AuthenticatePage />,
  },
  {
    path: "/controle",
    element: <ControlLayout />,
    children: [
      {
        path: "usuarios",
        element: <AccountsPage />,
      },
      {
        path: "moedas",
        element: <CoinsPage />,
      },
    ],
  },
]);

export { dashboardRoutes };
