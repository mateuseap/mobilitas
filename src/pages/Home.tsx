import DefaultPage from "../components/DefaultPage/DefaultPage";
import SemaphoresMap from "../components/SemaphoresMap/SemaphoresMap";

function Home() {
  return (
    <DefaultPage childrenClassName="w-full flex justify-center items-center">
      <SemaphoresMap />
    </DefaultPage>
  );
}

export default Home;
