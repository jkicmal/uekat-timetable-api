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

  constructor(startTime, endTime, description, location) {
    // If lesson is longer than 45 mins, subtract 10 mins from it
    // FIXME: This should't happen in model!
    const tempStartTime = moment(startTime);
    const tempEndTime = moment(endTime);
    const tempDuration = getMomentDurationInMins(tempStartTime, tempEndTime);
    this.startTime = getMomentDateTime(startTime);
    if (tempDuration > 45) {
      const newEndTime = moment(endTime).subtract("10", "minutes");
      this.endTime = getMomentDateTime(newEndTime);
      this.durationInMins = getMomentDurationInMins(startTime, newEndTime);
    } else {
      this.endTime = getMomentDateTime(endTime);
      this.durationInMins = getMomentDurationInMins(startTime, endTime);
    }

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
