import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    {/* <React.StrictMode>
      <App />
    </React.StrictMode> */}
    <RouterProvider router={routes} />
    <Toaster />
  </>
);
