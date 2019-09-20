import moment from "moment-timezone";
import { DATETIME_FORMAT, DATE_FORMAT } from "./constants";

export const getMomentDateTime = date => moment(date).format(DATETIME_FORMAT);

export const getMomentDate = date => moment(date).format(DATE_FORMAT);

export const getMomentDuration = (startTime, endTime) => {
  startTime = moment(startTime);
  endTime = moment(endTime);
  return moment.duration(endTime.diff(startTime));
};

export const getMomentDurationInMins = (startTime, endTime) => {
  return getMomentDuration(startTime, endTime).asMinutes();
};

export const getMomentDurationInDays = (startTime, endTime) => {
  return getMomentDuration(startTime, endTime).asDays();
};

export const stringContains = (string: string, substring: string) => {
  return string.toLowerCase().indexOf(substring.toLowerCase()) !== -1;
};

export const arrayLenghIsEqual = (array: any[], length: number) => {
  return array.length === length;
};

export const clg = (o: any) => console.log(o);

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const compareDates = (date1: Date, date2: Date) => {
  return moment(date1).isSame(moment(date2));
};
