export const adjustDate = (dateString) => {
  // Create a Date object from the provided date string
  const date = new Date(dateString);

  // Get the timezone offset in milliseconds and convert it to minutes
  const offsetInMinutes = date.getTimezoneOffset();

  // Convert offset to milliseconds
  const offsetInMilliseconds = offsetInMinutes * 60000;

  // Adjust the date by subtracting the offset
  const adjustedDate = new Date(date.getTime() - offsetInMilliseconds);

  // Get the adjusted date in the format YYYY-MM-DD
  const adjustedDateString = adjustedDate.toISOString().slice(0, 10);

  return adjustedDateString;
};
