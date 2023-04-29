import DefaultPage from "../components/DefaultPage/DefaultPage";
import SemaphoresMap from "../components/SemaphoresMap/SemaphoresMap";

function Home() {
  return (
    <DefaultPage childrenClassName="w-full flex flex-1 justify-center items-center">
        <SemaphoresMap simulation={false} center={{ lat: -8.05428, lng: -34.8813 }} />
    </DefaultPage>
  );
}

export default Home;
