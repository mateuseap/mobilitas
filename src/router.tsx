import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Metrics from "./pages/Metrics";

const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
    { path: "/metricas", element: <Metrics /> },
  ],
  { basename: "/mobilitas/" }
);

export default router;
