import React from "react";
import { RouteObject } from "react-router-dom";
import { Step01SimulationPage } from "../pages/control/simulations/new-simulation/step-01";
import { NewSimulationPage } from "../pages/control/simulations/new-simulation";
import { SimulationLayout } from "../shared/layouts/SimulationLayout";
import { SimulationsPage } from "../pages/control/simulations";

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
    ],
  },
];

export { simulationsRoutes };
