import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Simulation from "./pages/Simulation"
import Metrics from "./pages/Metrics";

const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
    { path: "/simulacao", element: <Simulation />},
    { path: "/metricas", element: <Metrics /> },
  ],
  { basename: "/mobilitas/" }
);

export default router;
