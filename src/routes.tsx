import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Metrics from "./pages/Metrics/Metrics";

function AllRoutes() {
  const basename = '/mobilitas';
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path={basename + "/"} element={<Home />} />
        <Route path={basename + "/metricas"} element={<Metrics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
