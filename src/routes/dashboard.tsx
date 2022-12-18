import React from "react";
import { createHashRouter } from "react-router-dom";
import { AuthenticatePage } from "../pages/auth";
import { AccountsPage } from "../pages/control/accounts";
import { AgencyFeesPage } from "../pages/control/agency-fees";
import { CoinsPage } from "../pages/control/coins";
import { ContainerTypesPage } from "../pages/control/container-types";
import { IcmsPage } from "../pages/control/icms";
import { IncotermsPage } from "../pages/control/incoterms";
import { ModalsPage } from "../pages/control/modals";
import { ObjectivesPage } from "../pages/control/objectives";
import { SafesPage } from "../pages/control/safes";
import { TaxRegimePage } from "../pages/control/tax-regime";
import { TypeOfEstimatePage } from "../pages/control/type-of-estimate";
import { UFsPage } from "../pages/control/uf";
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
        path: "tipo-de-contribuinte",
        element: <IcmsPage />,
      },
      {
        path: "ufs",
        element: <UFsPage />,
      },
      {
        path: "tipos-de-containers",
        element: <ContainerTypesPage />,
      },
      {
        path: "taxas-de-agenciamento",
        element: <AgencyFeesPage />,
      },
      {
        path: "modais",
        element: <ModalsPage />,
      },
    ],
  },
]);

export { dashboardRoutes };
