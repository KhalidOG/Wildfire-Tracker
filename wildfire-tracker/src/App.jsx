import { useState } from "react";
import useWildfires from "./hooks/useWildfires";
import Map from "./components/Map";
import FilterPanel from "./components/FilterPanel";
import filterEvents from "./utils/filterEvents";

const DEFAULT_FILTERS = {
  status: "all",
  startDate: "",
  endDate: "",
};

const App = () => {
  const { wildfireEvents, isLoading, errorMessage } = useWildfires();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filteredEvents = filterEvents(wildfireEvents, filters);

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex" }}>
      <FilterPanel filters={filters} onFiltersChange={setFilters} />

      <div style={{ flex: 1 }}>
        {isLoading && <p>Loading wildfire events...</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {!isLoading && !errorMessage && <Map wildfireEvents={filteredEvents} />}
      </div>
    </div>
  );
};

export default App;
