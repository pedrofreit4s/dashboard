import React from "react";
import { RouteObject } from "react-router-dom";
import { Step01SimulationPage } from "../pages/control/simulations/new-simulation/step-01";
import { NewSimulationPage } from "../pages/control/simulations/new-simulation";
import { SimulationLayout } from "../shared/layouts/SimulationLayout";
import { SimulationsPage } from "../pages/control/simulations";
import { Step02CurrenciesSimulationPage } from "../pages/control/simulations/new-simulation/currencies";

const simulationsRoutes: RouteObject[] = [
  {
    path: "/controle/nova-simulacao",
    element: <SimulationLayout />,
    children: [
      {
        path: "",
        element: <NewSimulationPage />,
      },
    ],
  },
  {
    path: "/controle/simulacoes",
    element: <SimulationLayout />,
    children: [
      {
        path: "",
        element: <SimulationsPage />,
      },
      {
        path: ":id",
        element: <Step01SimulationPage />,
      },
      {
        path: ":id/moedas",
        element: <Step02CurrenciesSimulationPage />,
      },
    ],
  },
];

export { simulationsRoutes };
