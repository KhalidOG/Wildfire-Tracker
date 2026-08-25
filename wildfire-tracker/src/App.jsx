import { useState } from "react";
import useWildfires from "./hooks/useWildfires";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import LoadingSpinner from "./components/LoadingSpinner";
import filterEvents from "./utils/filterEvents";
import styles from "./App.module.css";

const DEFAULT_FILTERS = {
  confidence: "all",
  startDate: "",
  endDate: "",
};

const App = () => {
  const { wildfireEvents, isLoading, errorMessage } = useWildfires();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filteredEvents = filterEvents(wildfireEvents, filters);

  return (
    <div className={styles.appLayout}>
      <Sidebar
        filters={filters}
        onFiltersChange={setFilters}
        errorMessage={errorMessage}
      />

      <div className={styles.mapArea}>
        {isLoading ? <LoadingSpinner /> : <Map wildfireEvents={filteredEvents} />}
      </div>
    </div>
  );
};

export default App;
