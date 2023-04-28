import { memo, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";

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

function SemaphoresMap() {
  const sempahoreImage =
    "https://i.imgur.com/sxUn59m_d.webp?maxwidth=760&fidelity=grand";

  const mapContainerStyle = {
    width: "1280px",
    height: "600px",
  };

  const center = {
    lat: -8.05428,
    lng: -34.8813,
  };

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

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        options={options}
      >
        {!result.isLoading &&
          result.data?.map((semaphore: SemaphoreType, index: number) => (
            <Marker
              position={{
                lat: semaphore.latitude,
                lng: semaphore.longitude,
              }}
              key={semaphore.semafororo}
              icon={sempahoreImage}
              onClick={() => handleMarkerClick(semaphore)}
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
        {result.data &&
          pathsIDs.data?.map((pathIDs: any) => {
            return (
              <Polyline
                path={[
                  {
                    lat: result.data[pathIDs["id1"]].latitude,
                    lng: result.data[pathIDs["id1"]].longitude,
                  },
                  {
                    lat: result.data[pathIDs["id2"]].latitude,
                    lng: result.data[pathIDs["id2"]].longitude,
                  },
                ]}
              />
            );
          })}
      </GoogleMap>
    </LoadScript>
  );
}

export default memo(SemaphoresMap);
