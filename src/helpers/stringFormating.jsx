// Helper function to format time
export function formatDate(string) {
  const date = new Date(string);
  const formattedDate = `${padWithZero(date.getDate())}.${padWithZero(date.getMonth() + 1)}.${date.getFullYear()}`;
  return `${formattedDate}`;
}

// Helper function to format time
export function formatTime(timeString) {
  const date = new Date(timeString);
  const formattedTime = `${padWithZero(date.getHours())}` === "23" ? "Klo: 24" : "Klo: " +`${padWithZero(date.getHours())}`;
  return `${formattedTime}`;
}
// Helper function to format date-time
function formatDateTime(timeString) {
  const date = new Date(timeString);
  const formattedDate = `${padWithZero(date.getDate())}.${padWithZero(date.getMonth() + 1)}.${date.getFullYear()}`;
  //const formattedTime = `${padWithZero(date.getHours())}.${padWithZero(date.getMinutes())}`;
  const formattedTime = `${padWithZero(date.getHours())}` === "23" ? "Klo: 24" : "Klo: " +`${padWithZero(date.getHours())}`;
  return `${formattedDate} - ${formattedTime}`;
}

// Helper function to pad a number with a leading zero if needed
function padWithZero(number) {
  return number.toString().padStart(2, '0');
}

// for unit testing
export { formatDateTime, padWithZero };
