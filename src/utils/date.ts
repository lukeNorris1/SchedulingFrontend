export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function convertTo12Hour(time: string) {
  const [hoursStr, minutes] = time.split(":");
  const hours = parseInt(hoursStr, 10);
  let formattedStartTime = "";

  if (hours < 12) {
    formattedStartTime = `${hours}:${minutes} AM`;
  } else if (hours === 12) {
    formattedStartTime = `${hours}:${minutes} PM`;
  } else {
    const formattedHours = hours % 12;
    formattedStartTime = `${formattedHours}:${minutes} PM`;
  }
  return formattedStartTime;
}

export function tConvert(date: Date) {
  const newDate = new Date(date);
  const hours = newDate.getHours();
  const isPM = hours >= 12;
  const twelveHourFormat = hours % 12 || 12;
  const minutes = newDate.getUTCMinutes();
  return `${twelveHourFormat}${minConvert(minutes)} ${isPM ? "PM" : "AM"}`;
}

export function minConvert(minutes: number) {
  if (minutes < 10 && minutes > 0) return `:0${minutes}`;
  if (minutes == 0) return "";
  return `:${minutes}`;
}

export function formatDate(date: Date) {
  const tempDate = new Date(date);
  return `${days[tempDate.getDay()]}, ${dateSuffixFormat(tempDate.getDate())} ${
    months[tempDate.getMonth()]
  }`;
}

export function startEndOfDate(date: Date) {
  const newDate = new Date(date);
  const startOfTheWeek = new Date(newDate);
  startOfTheWeek.setDate(newDate.getDate() - newDate.getDay());
  const endOfTheWeek = new Date(startOfTheWeek);
  endOfTheWeek.setDate(startOfTheWeek.getDate() + 6);
  return { start: startOfTheWeek, end: endOfTheWeek };
}

export function dateMonthYearDate(date: Date) {
  const newDate = new Date(date);

  const day = newDate.getDate(); // Get the day (1-31)
  const month = newDate.toLocaleString("default", { month: "long" }); // Get the month name (e.g., January)
  const year = newDate.getFullYear(); // Get the full year (e.g., 2023)

  return `${day}, ${month}, ${year}`;
}

export function dateSuffixFormat(date: number) {
  if (date == 1 || date % 20 == 1 || date % 30 == 1) return `${date}st`;
  else if (date == 2 || date % 20 == 2) return `${date}nd`;
  else if (date == 3 || date % 20 == 3) return `${date}rd`;
  else return `${date}th`;
}

export const daysInMonth = (year: number, month: number) =>
  new Date(year, month, 0).getDate();
export const firstDayOfMonth = (year: number, month: number) =>
  new Date(year, month, 0).getDay();
