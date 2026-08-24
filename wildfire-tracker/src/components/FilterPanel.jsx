const FilterPanel = ({ filters, onFiltersChange }) => {
  const handleStatusChange = (event) => {
    onFiltersChange({ ...filters, status: event.target.value });
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
        <label htmlFor="statusFilter">Status</label>
        <select id="statusFilter" value={filters.status} onChange={handleStatusChange}>
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
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
