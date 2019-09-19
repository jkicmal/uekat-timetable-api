import moment from "moment-timezone";

export const getMomentDateTime = dateTime => moment(dateTime).format("HH:mm YYYY-MM-DD");

export const getMomentDurationInMins = (startTime, endTime) => {
  startTime = moment(startTime);
  endTime = moment(endTime);
  return moment.duration(endTime.diff(startTime)).asMinutes();
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
