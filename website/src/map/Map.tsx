import "leaflet/dist/leaflet.css";
import { Loader } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect, SetStateAction } from "react";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function UpdateMapCenter({
  position,
}: {
  position: { lat: number; lng: number };
}) {
  const map = useMap();
  useEffect(() => {
    map.setView([position.lat, position.lng]);
  }, [map, position]);
  return null;
}

interface IMapProps {
  position: { lat: number; lng: number };
  setPosition: React.Dispatch<SetStateAction<{ lat: number; lng: number }>>;
}

function Map(props: IMapProps) {
  const { position, setPosition } = props;

  return (
    <>
      <MapContainer
        className=" w-full h-full "
        center={[position.lat, position.lng]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[position.lat, position.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <UpdateMapCenter position={position} />
      </MapContainer>
    </>
  );
}

export default Map;
