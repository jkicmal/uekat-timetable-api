import { getMomentDateTime, getMomentDurationInMins } from "./utils";
import LectureDescription from "./LectureDescription";

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
}
