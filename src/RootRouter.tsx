import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import AgentsTestPage from "./AgentsTestPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/agents",
    element: <AgentsTestPage />,
  },
]);

const RootRouter: React.FC = () => <RouterProvider router={router} />;

export default RootRouter;
