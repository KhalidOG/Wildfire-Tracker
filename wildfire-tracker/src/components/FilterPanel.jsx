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
    <div>
      <h2>Filters</h2>

      <div>
        <label htmlFor="confidenceFilter">Confidence</label>
        <select
          id="confidenceFilter"
          value={filters.confidence}
          onChange={handleConfidenceChange}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="nominal">Nominal</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label htmlFor="startDateFilter">Start date</label>
        <input
          id="startDateFilter"
          type="date"
          value={filters.startDate}
          onChange={handleStartDateChange}
        />
      </div>

      <div>
        <label htmlFor="endDateFilter">End date</label>
        <input
          id="endDateFilter"
          type="date"
          value={filters.endDate}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
};

export default FilterPanel;
