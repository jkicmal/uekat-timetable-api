import { Date } from "moment-timezone";
import { getMomentDateTime, getMomentDurationInMins, stringContains } from "../utils/utils";
import LectureDescription from "./LectureDescription";
import { DATE_FORMAT } from "../utils/constants";
import moment from "moment-timezone";

export default class Lecture {
  startTime: Date;
  endTime: Date;
  location: string;
  description: LectureDescription;
  durationInMins: number;

  constructor(startTime, endTime, description, location) {
    this.startTime = getMomentDateTime(startTime);
    this.endTime = getMomentDateTime(endTime);
    this.durationInMins = getMomentDurationInMins(startTime, endTime);
    this.location = location;
    this.description = description;
  }

  public getDate() {
    return moment(this.startTime).format(DATE_FORMAT);
  }

  public isOfType(type: string) {
    return this.description.type === type;
  }
}
