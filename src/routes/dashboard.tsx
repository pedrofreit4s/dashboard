import React from "react";
import { createHashRouter } from "react-router-dom";
import { AuthenticatePage } from "../pages/auth";
import { AccountsPage } from "../pages/control/accounts";
import { CoinsPage } from "../pages/control/coins";
import { IncotermsPage } from "../pages/control/incoterms";
import { ObjectivesPage } from "../pages/control/objectives";
import { SafesPage } from "../pages/control/safes";
import { TaxRegimePage } from "../pages/control/tax-regime";
import { TypeOfEstimatePage } from "../pages/control/type-of-estimate";
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
        path: "tipo-de-estimativa",
        element: <TypeOfEstimatePage />,
      },
      {
        path: "seguros",
        element: <SafesPage />,
      },
      {
        path: "incoterms",
        element: <IncotermsPage />,
      },
      {
        path: "icms",
        element: <CoinsPage />,
      },
    ],
  },
]);

export { dashboardRoutes };
