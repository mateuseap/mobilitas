import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Metrics from "./pages/Metrics/Metrics";

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/metricas"} element={<Metrics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
