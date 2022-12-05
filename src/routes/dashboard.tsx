import React from "react";
import { createHashRouter } from "react-router-dom";
import { AuthenticatePage } from "../pages/auth";
import { AccountsPage } from "../pages/control/accounts";
import { CoinsPage } from "../pages/control/coins";
import { ObjectivesPage } from "../pages/control/objectives";
import { TaxRegimePage } from "../pages/control/tax-regime";
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
      {
        path: "regime-tributario",
        element: <TaxRegimePage />,
      },
      {
        path: "objetivas",
        element: <ObjectivesPage />,
      },
      {
        path: "icms",
        element: <CoinsPage />,
      },
    ],
  },
]);

export { dashboardRoutes };
