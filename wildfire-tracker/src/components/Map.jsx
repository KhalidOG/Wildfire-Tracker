import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import EventMarker from "./EventMarker";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const NORTH_AMERICA_CENTER = [45, -100];
const DEFAULT_ZOOM = 4;

const Map = ({ wildfireEvents }) => {
  return (
    <MapContainer
      center={NORTH_AMERICA_CENTER}
      zoom={DEFAULT_ZOOM}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
      {wildfireEvents.map((wildfireEvent) => (
        <EventMarker key={wildfireEvent.id} wildfireEvent={wildfireEvent} />
      ))}
    </MapContainer>
  );
};

export default Map;
