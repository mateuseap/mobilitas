import { useQuery } from "@tanstack/react-query";
import DefaultPage from "../components/DefaultPage/DefaultPage";
import SemaphoresMap from "../components/SemaphoresMap/SemaphoresMap";

function Simulation() {
  const fetchSolution = async () => {
    const response = await fetch(
      "https://plumpflickeringtab.meap0187.repl.co/solution"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  };

  const solution = useQuery({
    retry: false,
    queryKey: ["solution"],
    queryFn: fetchSolution,
  });

  return (
    <DefaultPage childrenClassName="w-full flex flex-1 flex-col justify-center items-center gap-y-2">
      <SemaphoresMap
        simulation={true}
        center={{ lat: -8.04493, lng: -34.880372 }}
        zoom={17}
        highlightIds={[33, 35, 395, 96, 682]}
        mapContainerStyle={{ width: "1280px", height: "570px" }}
      />
      {solution && solution.data !== undefined && (
        <div className="font-medium">
          Score do trajeto sem otimização: {solution.data["path_naive_score"]} /
          Score do trajeto com a otimização: {solution.data["path_better_score"]}
        </div>
      )}
    </DefaultPage>
  );
}

export default Simulation;
