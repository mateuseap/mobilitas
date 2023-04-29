import DefaultPage from "../components/DefaultPage/DefaultPage";
import BarChart from "../components/BarChart/BarChart";

function Metrics() {
  const data = [10, 20, 30, 40, 50];
  const labels = ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"];

  return (
    <DefaultPage childrenClassName="w-full flex flex-1 justify-center items-center">
      <div className="w-[50%] text-black">
        <BarChart data={data} labels={labels} />
      </div>
    </DefaultPage>
  );
}

export default Metrics;
