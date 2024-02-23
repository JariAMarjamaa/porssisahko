// Helper function to format time
export function formatDate(string) {
  const date = new Date(string);
  const formattedDate = `${padWithZero(date.getDate())}.${padWithZero(date.getMonth() + 1)}.${date.getFullYear()}`;
  return `${formattedDate}`;
}

// Helper function to pad a number with a leading zero if needed
function padWithZero(number) {
  return number.toString().padStart(2, '0');
}

// for unit testing
//export { formatTime, padWithZero };
