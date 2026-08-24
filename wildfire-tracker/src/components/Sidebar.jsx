import FilterPanel from "./FilterPanel";
import styles from "./Sidebar.module.css";

const Sidebar = ({ filters, onFiltersChange, errorMessage }) => {
  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.title}>Wildfire Tracker</h1>

      <FilterPanel filters={filters} onFiltersChange={onFiltersChange} />

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </aside>
  );
};

export default Sidebar;
