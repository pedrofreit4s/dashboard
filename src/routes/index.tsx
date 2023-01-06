import { createHashRouter } from "react-router-dom";
import { authRoutes } from "./auth";
import { tablesRoutes } from "./dashboard";
import { simulationsRoutes } from "./simulations";

const routes = createHashRouter([tablesRoutes, authRoutes, ...simulationsRoutes]);

export { routes };
