export function convertTimestamp(timestamp) {
  const dateObj = new Date(timestamp);
  const date = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const time = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return { date, time };
}

export function convertTimestamp12(timestamp) {
  const dateObj = new Date(timestamp);

  // বছর ১ বাড়ানো
  dateObj.setFullYear(dateObj.getFullYear() + 1);

  const date = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const time = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return { date, time };
}

export function convertTimestamp3(timestamp) {
  const dateObj = new Date(timestamp);
  const date = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const time = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const timepast = time + ", " + date;

  return timepast;
}

export function convertTimestamp2(inputDate) {
  // Parse the input date string
  const date = new Date(inputDate);

  // Get the year, month, and day components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  // Construct the formatted date string
  return `${year}-${month}-${day}`;
}
