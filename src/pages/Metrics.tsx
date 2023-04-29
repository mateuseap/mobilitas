import DefaultPage from "../components/DefaultPage/DefaultPage";
import BarChart from "../components/BarChart/BarChart";
import Card, { CardProps } from "../components/Card/Card";
import { useQuery } from "@tanstack/react-query";

function Metrics() {
  const data = [10, 20, 30, 40, 50];
  const labels = ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"];

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

  const cards: Array<CardProps> = [
    {
      title: "Score global sem otimização",
      value:
        solution &&
        solution.data !== undefined &&
        solution.data["naive_global_score"],
    },
    {
      title: "Score global com a otimização",
      value:
        solution &&
        solution.data !== undefined &&
        solution.data["better_global_score"],
    },
  ];

  return (
    <DefaultPage childrenClassName="w-full flex flex-1 flex-col gap-y-8 justify-center items-center">
      <div className="pr-6 flex flex-row grid-cols-3 gap-x-3">
        {cards.map((card) => {
          return (
            <Card key={card.title} title={card.title} value={card.value} />
          );
        })}
      </div>
      <div className="w-[50%] text-center text-black">
        <div className="text-white text-xl">Tipos de semáforos</div>
        <BarChart data={data} labels={labels} />
      </div>
    </DefaultPage>
  );
}

export default Metrics;
