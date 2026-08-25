import { Marker, Popup } from "react-leaflet";
import formatDate from "../utils/formatDate";

const EventMarker = ({ wildfireEvent }) => {
  const { coordinates, date, confidence, firePower, isDaytime } = wildfireEvent;
  const markerPosition = [coordinates.latitude, coordinates.longitude];

  return (
    <Marker position={markerPosition}>
      <Popup>
        <strong>Fire Detection</strong>
        <br />
        {formatDate(date)}
        <br />
        Confidence: {confidence}
        <br />
        Fire radiative power: {firePower} MW
        <br />
        Detected: {isDaytime ? "Daytime" : "Nighttime"} satellite pass
      </Popup>
    </Marker>
  );
};

export default EventMarker;