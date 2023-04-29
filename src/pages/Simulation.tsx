import DefaultPage from "../components/DefaultPage/DefaultPage";
import SemaphoresMap from "../components/SemaphoresMap/SemaphoresMap";

function Simulation() {
  return (
    <DefaultPage childrenClassName="w-full flex flex-1 justify-center items-center">
      <SemaphoresMap
        simulation={true}
        center={{ lat: -8.04493, lng: -34.880372 }}
        zoom={17}
        highlightIds={[33, 35, 395, 96, 682]}
      />
    </DefaultPage>
  );
}

export default Simulation;
