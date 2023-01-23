import { createHashRouter } from "react-router-dom";
import { authRoutes } from "./auth";
import { tablesRoutes } from "./dashboard";
import { othersRoutes } from "./others";
import { simulationsRoutes } from "./simulations";

const routes = createHashRouter([tablesRoutes, authRoutes, ...simulationsRoutes, ...othersRoutes]);

export { routes };
