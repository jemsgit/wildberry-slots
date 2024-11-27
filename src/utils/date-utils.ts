import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);

export function msToHuman(ms: number) {
  // 1- Convert to seconds:
  let seconds = ms / 1000;
  // 2- Extract hours:
  const hours = parseInt((seconds / 3600).toString()); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  const minutes = parseInt((seconds / 60).toString()); // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;
  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds.toFixed(
    2
  )}`;
}

export function parseDateFromString(input: string, format = "DD.MM.YYYY") {
  return dayjs(input, format).toDate();
}

export function dateToFormat(date: Date, outputFormat: string = "DD.MM.YYYY") {
  return dayjs(date).format(outputFormat);
}

export function getTimeDiff(inputDate: Date) {
  const moscowOffsetMinutes = 3 * 60;
  const localOffsetMinutes = new Date().getTimezoneOffset();

  const timezoneShiftMinutes = -1 * (localOffsetMinutes + moscowOffsetMinutes);

  // Get the current time in the local timezone
  const now = dayjs();
  const inputDateAdjusted = dayjs(inputDate).add(
    timezoneShiftMinutes,
    "minute"
  );

  return now.diff(inputDateAdjusted);
}
