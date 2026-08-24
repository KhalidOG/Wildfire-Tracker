const formatDate = (isoDateString) => {
  if (!isoDateString) {
    return "Unknown date";
  }

  const parsedDate = new Date(isoDateString);

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default formatDate;
