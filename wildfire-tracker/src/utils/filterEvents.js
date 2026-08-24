const filterEvents = (wildfireEvents, filters) => {
  if (!wildfireEvents || wildfireEvents.length === 0) {
    return [];
  }

  const { status, startDate, endDate } = filters;

  return wildfireEvents.filter((wildfireEvent) => {
    const matchesStatus = status === "all" || wildfireEvent.status === status;

    const eventDate = new Date(wildfireEvent.date);
    const matchesStartDate = !startDate || eventDate >= new Date(startDate);
    const matchesEndDate = !endDate || eventDate <= new Date(endDate);

    return matchesStatus && matchesStartDate && matchesEndDate;
  });
};

export default filterEvents;
