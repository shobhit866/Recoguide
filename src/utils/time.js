import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function toUTC(date) {
  return dayjs(date).utc().format();
}
