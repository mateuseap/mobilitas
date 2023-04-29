import DefaultPage from "../components/DefaultPage/DefaultPage";
import SemaphoresMap from "../components/SemaphoresMap/SemaphoresMap";

function Simulation() {
  return (
    <DefaultPage childrenClassName="w-full flex flex-1 flex-col justify-center items-center gap-y-2">
      <SemaphoresMap
        simulation={true}
        center={{ lat: -8.04493, lng: -34.880372 }}
        zoom={17}
        highlightIds={[33, 35, 395, 96, 682]}
        mapContainerStyle={{ width: "1280px", height: "570px" }}
      />
      <div className="font-semibold">
        Tempo do trajeto sem otimização: X /
        Tempo do trajeto com a otimização: Y
      </div>
    </DefaultPage>
  );
}

export default Simulation;
