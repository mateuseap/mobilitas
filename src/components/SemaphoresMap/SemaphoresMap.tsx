import { memo } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
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
  const mapContainerStyle = {
    width: "1280px",
    height: "600px",
  };

  const center = {
    lat: -8.05428,
    lng: -34.8813,
  };

  const fetchSemaphores = async () => {
    const response = await fetch(
      "http://dados.recife.pe.gov.br/api/3/action/datastore_search?resource_id=ab6343e9-c3f2-4d62-9554-5778f9f33738&limit=704"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.result.records;
  };

  const result = useQuery({
    queryKey: ["semaphores"],
    queryFn: fetchSemaphores,
  });

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
      >
        {!result.isLoading &&
          result.data?.map((semaphore: SemaphoreType) => (
            <Marker
              position={{
                lat: semaphore.latitude,
                lng: semaphore.longitude,
              }}
              key={semaphore.semafororo}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default memo(SemaphoresMap);
