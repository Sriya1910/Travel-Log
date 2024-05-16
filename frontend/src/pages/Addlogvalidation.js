export const isValidStartDate = (startDate) => {
  const currentDate = new Date();
  const selectedStartDate = new Date(startDate);
  return selectedStartDate <= currentDate;
};

// Function to check if the end date is later than the start date and not greater than the current date
export const isValidEndDate = (startDate, endDate) => {
  const currentDate = new Date();
  const selectedStartDate = new Date(startDate);
  const selectedEndDate = new Date(endDate);
  
  // Set hours, minutes, seconds, and milliseconds of current date to 0 for accurate comparison
 
  return selectedEndDate >= selectedStartDate && selectedEndDate <= currentDate;
};

export const isValidLogType = (logType) => {
  return logType.toLowerCase() === 'public' || logType.toLowerCase() === 'private';
};
