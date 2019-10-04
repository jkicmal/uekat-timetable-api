import Lesson from "./Lesson";
import { getMomentDateTime, getMomentDurationInMins } from "../utils/utils";

export default class Break {
  startTime: string;
  endTime: string;
  durationInMins: number;

  constructor(startTime: string, endTime: string) {
    this.startTime = getMomentDateTime(startTime);
    this.endTime = getMomentDateTime(endTime);
    this.durationInMins = getMomentDurationInMins(startTime, endTime);
  }

  public static fromLessonsArray(lessons: Lesson[]) {
    const breaks: Break[] = [];
    if (lessons.length > 1) {
      for (let i = 0; i < lessons.length - 1; i++) {
        const breakStartTime = lessons[i].endTime;
        const breakEndTime = lessons[i + 1].startTime;
        breaks.push(new Break(breakStartTime, breakEndTime));
      }
    }
    return breaks;
  }
}
