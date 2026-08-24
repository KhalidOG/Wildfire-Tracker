import useWildfires from "./hooks/useWildfires";
import Map from "./components/Map";

const App = () => {
  const { wildfireEvents, isLoading, errorMessage } = useWildfires();

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {isLoading && <p>Loading wildfire events...</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {!isLoading && !errorMessage && <Map wildfireEvents={wildfireEvents} />}
    </div>
  );
};

export default App;
