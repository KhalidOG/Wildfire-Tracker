const filterEvents = (wildfireEvents, filters) => {
  if (!wildfireEvents || wildfireEvents.length === 0) {
    return [];
  }

  const { confidence, startDate, endDate } = filters;

  return wildfireEvents.filter((wildfireEvent) => {
    const matchesConfidence =
      confidence === "all" || wildfireEvent.confidence === confidence;

    const eventDate = new Date(wildfireEvent.date);
    const matchesStartDate = !startDate || eventDate >= new Date(startDate);
    const matchesEndDate = !endDate || eventDate <= new Date(endDate);

    return matchesConfidence && matchesStartDate && matchesEndDate;
  });
};

export default filterEvents;
