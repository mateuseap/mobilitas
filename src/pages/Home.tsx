import DefaultPage from "../components/DefaultPage/DefaultPage";
import SemaphoresMap from "../components/SemaphoresMap/SemaphoresMap";

function Home() {
  return (
    <DefaultPage childrenClassName="w-full flex flex-1 justify-center items-center">
        <SemaphoresMap />
    </DefaultPage>
  );
}

export default Home;
