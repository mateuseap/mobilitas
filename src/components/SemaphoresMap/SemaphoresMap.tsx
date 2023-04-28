import { memo } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "1280px",
  height: "600px",
};

const center = {
  lat: -8.05428,
  lng: -34.8813,
};

function SemaphoresMap() {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
      >
        <Marker
          position={{
            lat: -8.05428,
            lng: -34.8813,
          }}
          key={0}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default memo(SemaphoresMap);
