import moment from "moment-timezone";

export const getMomentDateTime = dateTime =>
  moment(dateTime).format("HH:mm YYYY-MM-DD");
