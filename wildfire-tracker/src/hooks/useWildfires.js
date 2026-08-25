import { useState, useEffect } from "react";

const FIRMS_MAP_KEY = import.meta.env.VITE_FIRMS_MAP_KEY;
const FIRMS_SOURCE = "VIIRS_SNPP_NRT";
const CANADA_BOUNDING_BOX = "-141,41,-52,84";
const DAY_RANGE = 3;

const FIRMS_AREA_URL = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${FIRMS_MAP_KEY}/${FIRMS_SOURCE}/${CANADA_BOUNDING_BOX}/${DAY_RANGE}`;

const parseCsv = (csvText) => {
  const rows = csvText.trim().split("\n");

  if (rows.length < 2) {
    return [];
  }

  const headers = rows[0].split(",");

  return rows.slice(1).map((row) => {
    const values = row.split(",");
    const rowObject = {};

    headers.forEach((header, index) => {
      rowObject[header.trim()] = values[index]?.trim();
    });

    return rowObject;
  });
};

const fetchFireDetections = async () => {
  if (!FIRMS_MAP_KEY) {
    throw new Error(
      "Missing FIRMS API key. Add VITE FIRMS MAP KEY to the .env file."
    );
  }

  const response = await fetch(FIRMS_AREA_URL);

  if (!response.ok) {
    throw new Error(`FIRMS request failed with status ${response.status}`);
  }

  const csvText = await response.text();
  return parseCsv(csvText);
};

const hasValidCoordinates = (latitude, longitude) => {
  return (
    latitude !== undefined &&
    longitude !== undefined &&
    !Number.isNaN(Number(latitude)) &&
    !Number.isNaN(Number(longitude))
  );
};

const CONFIDENCE_LABELS = {
  l: "low",
  n: "nominal",
  h: "high",
};

const normalizeConfidence = (confidenceCode) => {
  return CONFIDENCE_LABELS[confidenceCode] ?? confidenceCode;
};

const buildIsoDate = (acquisitionDate, acquisitionTime) => {
  const paddedTime = (acquisitionTime ?? "").padStart(4, "0");
  const hours = paddedTime.slice(0, 2);
  const minutes = paddedTime.slice(2, 4);
  return `${acquisitionDate}T${hours}:${minutes}:00Z`;
};

const normalizeFireDetection = (rawDetection) => {
  const {
    latitude,
    longitude,
    acq_date: acquisitionDate,
    acq_time: acquisitionTime,
    confidence,
    bright_ti4: brightness,
    frp: firePower,
    daynight,
  } = rawDetection;

  if (!hasValidCoordinates(latitude, longitude)) {
    return null;
  }

  return {
    id: `${latitude}-${longitude}-${acquisitionDate}-${acquisitionTime}`,
    coordinates: {
      latitude: Number(latitude),
      longitude: Number(longitude),
    },
    date: buildIsoDate(acquisitionDate, acquisitionTime),
    confidence: normalizeConfidence(confidence),
    brightness: Number(brightness),
    firePower: Number(firePower),
    isDaytime: daynight === "D",
  };
};

const useWildfires = () => {
  const [wildfireEvents, setWildfireEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const loadFireDetections = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const rawDetections = await fetchFireDetections();

        if (!rawDetections || rawDetections.length === 0) {
          setWildfireEvents([]);
          return;
        }

        const normalizedDetections = rawDetections
          .map(normalizeFireDetection)
          .filter((detection) => detection !== null);

        setWildfireEvents(normalizedDetections);
      } catch (error) {
        setErrorMessage(`Unable to load wildfire data: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadFireDetections();
  }, []);

  return { wildfireEvents, isLoading, errorMessage };
};

export default useWildfires;