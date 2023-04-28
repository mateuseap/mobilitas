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

  const path = [
    { lat: -8.04829, lng: -34.876001 },
    { lat: -8.04912, lng: -34.874913 },
  ];

  const fetchSemaphores = async () => {
    const response = await fetch("https://plumpflickeringtab.meap0187.repl.co");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.result.records;
  };

  const result = useQuery({
    queryKey: ["semaphores"],
    queryFn: fetchSemaphores,
    retry: 2,
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
          result.data?.map((semaphore: SemaphoreType) => (
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
                      <b>Tipo do semáforo e ID:</b> {semaphore.tipo} | {semaphore.semafororo}
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
        <Polyline path={path} />
      </GoogleMap>
    </LoadScript>
  );
}

export default memo(SemaphoresMap);
