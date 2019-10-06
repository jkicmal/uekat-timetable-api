import Lesson from "./Lesson";
import { getMomentDateTime, getMomentDurationInMins } from "../utils/utils";

export default class LessonBreak {
  startTime: string;
  endTime: string;
  durationInMins: number;

  constructor(startTime: string, endTime: string) {
    this.startTime = getMomentDateTime(startTime);
    this.endTime = getMomentDateTime(endTime);
    this.durationInMins = getMomentDurationInMins(startTime, endTime);
  }

  public static fromLessonsArray(lessons: Lesson[]) {
    const lessonsBreaks: LessonBreak[] = [];
    if (lessons.length > 1) {
      for (let i = 0; i < lessons.length - 1; i++) {
        const lessonBreakStartTime = lessons[i].endTime;
        const lessonBreakEndTime = lessons[i + 1].startTime;
        lessonsBreaks.push(new LessonBreak(lessonBreakStartTime, lessonBreakEndTime));
      }
    }
    return lessonsBreaks;
  }
}
