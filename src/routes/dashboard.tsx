import React from "react";
import { createHashRouter, RouteObject } from "react-router-dom";
import { AuthenticatePage } from "../pages/auth";
import { AccountsPage } from "../pages/control/tables/accounts";
import { AgencyFeesPage } from "../pages/control/tables/agency-fees";
import { CoinsPage } from "../pages/control/tables/coins";
import { ContainerTypesPage } from "../pages/control/tables/container-types";
import { DispatchServicesAndFeesPage } from "../pages/control/tables/dispatch-services-and-fees";
import { IcmsPage } from "../pages/control/tables/icms";
import { IncotermsPage } from "../pages/control/tables/incoterms";
import { ModalsPage } from "../pages/control/tables/modals";
import { ObjectivesPage } from "../pages/control/tables/objectives";
import { SafesPage } from "../pages/control/tables/safes";
import { TaxRegimePage } from "../pages/control/tables/tax-regime";
import { TypeOfEstimatePage } from "../pages/control/tables/type-of-estimate";
import { UFsPage } from "../pages/control/tables/uf";
import { ControlLayout } from "../shared/layouts/ControlLayout";

// {
//   path: "/",
//   element: <AuthenticatePage />,
// },
const tablesRoutes: RouteObject = {
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
    {
      path: "taxas-de-despachantes",
      element: <DispatchServicesAndFeesPage />,
    },
  ],
};

export { tablesRoutes };
