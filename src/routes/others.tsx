import React from "react";
import { RouteObject } from "react-router-dom";
import { SimulationLayout } from "../shared/layouts/SimulationLayout";
import { Customers } from "../pages/control/customers";
import { NewCustomer } from "../pages/control/customers/new";
import { UpdateCustomer } from "../pages/control/customers/update";

const othersRoutes: RouteObject[] = [
  {
    path: "/controle/novo-cliente",
    element: <SimulationLayout />,
    children: [
      {
        path: "",
        element: <NewCustomer />,
      },
    ],
  },
  {
    path: "/controle/clientes",
    element: <SimulationLayout />,
    children: [
      {
        path: "",
        element: <Customers />,
      },
      {
        path: ":id",
        element: <UpdateCustomer />,
      },
    ],
  },
];

export { othersRoutes };
