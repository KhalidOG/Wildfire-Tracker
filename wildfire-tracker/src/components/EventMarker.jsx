import { Marker, Popup } from "react-leaflet";
import formatDate from "../utils/formatDate";

const EventMarker = ({ wildfireEvent }) => {
  const { title, date, coordinates, sourceUrl } = wildfireEvent;
  const markerPosition = [coordinates.latitude, coordinates.longitude];

  return (
    <Marker position={markerPosition}>
      <Popup>
        <strong>{title}</strong>
        <br />
        {formatDate(date)}
        <br />
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
          View on EONET
        </a>
      </Popup>
    </Marker>
  );
};

export default EventMarker;