import React from "react";
import { RouteObject } from "react-router-dom";
import { Step01SimulationPage } from "../pages/control/simulations";
import { NewSimulationPage } from "../pages/control/simulations/new-simulation";
import { SimulationLayout } from "../shared/layouts/SimulationLayout";

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
        path: ":id",
        element: <Step01SimulationPage />,
      },
    ],
  },
];

export { simulationsRoutes };
