import styles from "./FilterPanel.module.css";

const FilterPanel = ({ filters, onFiltersChange }) => {
  const handleConfidenceChange = (event) => {
    onFiltersChange({ ...filters, confidence: event.target.value });
  };

  const handleStartDateChange = (event) => {
    onFiltersChange({ ...filters, startDate: event.target.value });
  };

  const handleEndDateChange = (event) => {
    onFiltersChange({ ...filters, endDate: event.target.value });
  };

  return (
    <div className={styles.filterPanel}>
      <div className={styles.field}>
        <label htmlFor="confidenceFilter" className={styles.label}>
          Confidence
        </label>
        <select
          id="confidenceFilter"
          className={styles.select}
          value={filters.confidence}
          onChange={handleConfidenceChange}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="nominal">Nominal</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="startDateFilter" className={styles.label}>
          Start date
        </label>
        <input
          id="startDateFilter"
          type="date"
          className={styles.dateInput}
          value={filters.startDate}
          onChange={handleStartDateChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="endDateFilter" className={styles.label}>
          End date
        </label>
        <input
          id="endDateFilter"
          type="date"
          className={styles.dateInput}
          value={filters.endDate}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
};

export default FilterPanel;
