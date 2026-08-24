import { useState, useEffect } from "react";

const EONET_WILDFIRES_URL =
  "https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires&status=open&days=20";

const fetchWildfireEvents = async () => {
  const response = await fetch(EONET_WILDFIRES_URL);

  if (!response.ok) {
    throw new Error(`EONET request failed with status ${response.status}`);
  }

  const wildfireData = await response.json();
  return wildfireData.events;
};

const hasValidCoordinates = (coordinates) => {
  return (
    Array.isArray(coordinates) &&
    coordinates.length === 2 &&
    typeof coordinates[0] === "number" &&
    typeof coordinates[1] === "number"
  );
};

const normalizeWildfireEvent = (rawEvent) => {
  if (!rawEvent.geometry || rawEvent.geometry.length === 0) {
    return null;
  }

  const latestGeometry = rawEvent.geometry[rawEvent.geometry.length - 1];

  if (!hasValidCoordinates(latestGeometry.coordinates)) {
    return null;
  }

  const [longitude, latitude] = latestGeometry.coordinates;
  const sourceUrl = rawEvent.sources?.[0]?.url ?? rawEvent.link;

  return {
    id: rawEvent.id,
    title: rawEvent.title,
    date: latestGeometry.date,
    coordinates: { latitude, longitude },
    status: rawEvent.closed ? "closed" : "open",
    sourceUrl,
  };
};

const useWildfires = () => {
  const [wildfireEvents, setWildfireEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const loadWildfireEvents = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const rawEvents = await fetchWildfireEvents();

        if (!rawEvents || rawEvents.length === 0) {
          setWildfireEvents([]);
          return;
        }

        const normalizedEvents = rawEvents
          .map(normalizeWildfireEvent)
          .filter((wildfireEvent) => wildfireEvent !== null);

        setWildfireEvents(normalizedEvents);
      } catch (error) {
        setErrorMessage(`Unable to load wildfire events: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadWildfireEvents();
  }, []);

  return { wildfireEvents, isLoading, errorMessage };
};

export default useWildfires;