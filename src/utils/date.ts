function formatDateToMDY(dateString: string): string {
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const month = date.getMonth() + 1; // Months are 0-based in JavaScript
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

function formatDateToCustomString(dateString: string): string {
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  return `On ${formattedDate}`;
}

export { formatDateToCustomString, formatDateToMDY };
