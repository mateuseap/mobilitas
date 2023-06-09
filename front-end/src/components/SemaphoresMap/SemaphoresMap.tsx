import { memo, useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import DefaultSemaphore from "../../../public/assets/default_semaphore.webp";
import RedSemaphore from "../../../public/assets/red_semaphore.webp";
import YellowSemaphore from "../../../public/assets/yellow_semaphore.webp";
import GreenSemaphore from "../../../public/assets/green_semaphore.webp";

export interface SemaphoreType {
  semafororo: number;
  latitude: number;
  longitude: number;
  tipo: string;
  funcionamento: string;
  bairro: string;
  localizacao1: string;
  localizacao2: string;
}

export interface SemaphoresMapProps {
  simulation: boolean;
  center: { lat: number; lng: number };
  zoom?: number;
  highlightIds?: Array<number>;
  mapContainerStyle?: { width: string; height: string };
}

function SemaphoresMap({
  simulation,
  center,
  zoom = 16,
  highlightIds,
  mapContainerStyle = { width: "1280px", height: "600px" },
}: SemaphoresMapProps) {
  const [isSimulation] = useState(simulation);
  const [simulationIDs, setSimulationIDs] = useState<Array<number>>([]);
  const [pathsIDsLoaded, setPathsIDsLoaded] = useState(false);

  const options = {
    disablePointsOfInterest: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [{ visibility: "on" }],
      },
      {
        featureType: "road",
        elementType: "labels.text",
        stylers: [{ visibility: "on" }],
      },
    ],
  };

  const fetchSemaphores = async () => {
    const response = await fetch("https://plumpflickeringtab.meap0187.repl.co");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.result.records;
  };

  const fetchPathsIDs = async () => {
    const response = await fetch(
      "https://plumpflickeringtab.meap0187.repl.co/paths"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  };

  const result = useQuery({
    queryKey: ["semaphores"],
    queryFn: fetchSemaphores,
    retry: 2,
  });

  const pathsIDs = useQuery({
    queryKey: ["pathsIDs"],
    queryFn: fetchPathsIDs,
  });

  const [selectedSemaphore, setSelectedSemaphore] =
    useState<SemaphoreType | null>(null);

  const handleMarkerClick = (semaphore: SemaphoreType) => {
    setSelectedSemaphore(semaphore);
  };

  const handleInfoWindowClose = () => {
    setSelectedSemaphore(null);
  };

  useEffect(() => {
    if (pathsIDs.data) {
      pathsIDs.data.map((pathIDs: any) => {
        simulationIDs.push(pathIDs["id1"]);
        simulationIDs.push(pathIDs["id2"]);
      });

      setSimulationIDs(simulationIDs);
      setPathsIDsLoaded(true);
    }
  }, [pathsIDs]);

  const semaphoreIcons: { [key: number]: string } = {
    0: RedSemaphore,
    1: YellowSemaphore,
    2: GreenSemaphore,
  };

  const [semaphoreIconMap, setSemaphoreIconMap] = useState<{
    [key: number]: string;
  }>({});

  // Initialize the icon map with a random icon for each semaphore
  useEffect(() => {
    const newSemaphoreIconMap: { [key: number]: string } = {};
    result.data?.forEach((semaphore: SemaphoreType) => {
      const randomNum = Math.floor(Math.random() * 3);
      newSemaphoreIconMap[semaphore.semafororo] = semaphoreIcons[randomNum];
    });
    setSemaphoreIconMap(newSemaphoreIconMap);
  }, [result.data]);

  // Update the semaphore icon every 6 seconds (red -> yellow -> green)
  useEffect(() => {
    const interval = setInterval(() => {
      const newSemaphoreIconMap = { ...semaphoreIconMap };
      result.data?.forEach((semaphore: SemaphoreType) => {
        const currentIcon =
          newSemaphoreIconMap[semaphore.semafororo] || DefaultSemaphore;
        const currentIndex = Object.values(semaphoreIcons).indexOf(currentIcon);
        const nextIndex =
          (currentIndex + 1) % Object.values(semaphoreIcons).length;
        newSemaphoreIconMap[semaphore.semafororo] = semaphoreIcons[nextIndex];
      });
      setSemaphoreIconMap(newSemaphoreIconMap);
    }, 6000);

    return () => clearInterval(interval);
  }, [semaphoreIconMap, result.data]);

  return (
    <div className="flex flex-col text-center font-medium text-xl gap-y-2">
      {isSimulation ? (
        <div className="font-bold">Simulação</div>
      ) : (
        <div className="font-bold">Todos os semáforos de Recife</div>
      )}
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          options={options}
          zoom={zoom}
        >
          {!result.isLoading &&
            pathsIDsLoaded &&
            result.data?.map((semaphore: SemaphoreType, index: number) => (
              <Marker
                position={{
                  lat: semaphore.latitude,
                  lng: semaphore.longitude,
                }}
                key={semaphore.semafororo}
                icon={
                  semaphoreIconMap[semaphore.semafororo] || DefaultSemaphore
                }
                onClick={() => handleMarkerClick(semaphore)}
                visible={
                  !isSimulation
                    ? true
                    : simulationIDs.includes(index)
                    ? true
                    : false
                }
              >
                {selectedSemaphore?.semafororo === semaphore.semafororo && (
                  <InfoWindow onCloseClick={handleInfoWindowClose}>
                    <div className="text-black">
                      <h2>
                        <b>Tipo do semáforo e ID/Index:</b> {semaphore.tipo} | {semaphore.semafororo}/{index}
                      </h2>
                      <p>
                        <b>Bairro:</b> {semaphore.bairro}
                      </p>
                      <p>
                        <b>Localização:</b> {semaphore.localizacao1} - {semaphore.localizacao2}
                      </p>
                      <p>
                        <b>Latitude</b> {semaphore.latitude}
                      </p>
                      <p>
                        <b>Longitude:</b> {semaphore.longitude}
                      </p>
                      <p>
                        <b>Funcionamento:</b> {semaphore.funcionamento}
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          {isSimulation &&
            result.data &&
            pathsIDs.data?.map((pathIDs: any, index: number) => {
              const indexId1 = result.data.findIndex(
                (semaphore: any) => semaphore._id === pathIDs["id1"]
              );
              const indexId2 = result.data.findIndex(
                (semaphore: any) => semaphore._id === pathIDs["id2"]
              );

              const polyOptions = {
                strokeColor: "blue",
                strokeWeight: 3,
              };

              if (
                highlightIds?.includes(indexId1) &&
                highlightIds?.includes(indexId2)
              ) {
                polyOptions["strokeColor"] = "green";
              }

              if (
                simulationIDs.includes(indexId1) &&
                simulationIDs.includes(indexId2)
              ) {
                return (
                  <Polyline
                    key={index}
                    path={[
                      {
                        lat: result.data[indexId1].latitude,
                        lng: result.data[indexId1].longitude,
                      },
                      {
                        lat: result.data[indexId2].latitude,
                        lng: result.data[indexId2].longitude,
                      },
                    ]}
                    options={polyOptions}
                  />
                );
              }
            })}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default memo(SemaphoresMap);
