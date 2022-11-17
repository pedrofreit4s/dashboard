import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { dashboardRoutes } from "./routes/dashboard";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    {/* <React.StrictMode>
      <App />
    </React.StrictMode> */}
    <RouterProvider router={dashboardRoutes} />
  </>
);
