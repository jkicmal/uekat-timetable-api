import { Date } from "moment-timezone";
import { getMomentDateTime, getMomentDurationInMins } from "../utils/utils";
import LessonDescription from "./LessonDescription";
import { DATE_FORMAT } from "../utils/constants";
import moment from "moment-timezone";

export default class Lesson {
  startTime: Date;
  endTime: Date;
  location: string;
  description: LessonDescription;
  durationInMins: number;

  // TODO: If lesson is longer than 45 mins it ends 10 minutes earlier
  // It happens because there should be a break in a middle of class
  // But there is not ;p

  constructor(startTime, endTime, description, location) {
    this.startTime = getMomentDateTime(startTime);
    this.endTime = getMomentDateTime(endTime); // TODO: -10 mins if duration > 45
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

  public isLecture() {
    return (
      this.isOfType(LessonDescription.TYPES.LECTURE_CREDIT) ||
      this.isOfType(LessonDescription.TYPES.LECTURE_EXAM)
    );
  }
}
