import moment from "moment-timezone";
import { Date } from "moment-timezone";
import Lesson from "./Lesson";

export default class Day {
  date: Date;
  lessons: Lesson[];

  constructor(date: Date) {
    this.date = date;
    this.lessons = [];
  }

  public setLessons(lessons: Lesson[]) {
    this.lessons = lessons;
  }

  public getLessonsCount() {
    return this.lessons.length;
  }

  public getLessonsOfTypeCount(lessonType: string) {
    if (this.getLessonsCount() === 0) return 0;
    return this.lessons.reduce(
      (accumulator, lesson) => (lesson.isOfType(lessonType) ? accumulator + 1 : accumulator),
      0
    );
  }

  public getLessonsTypePercentage(lessonType: string) {
    if (this.getLessonsCount() === 0) return 0;
    return this.getLessonsOfTypeCount(lessonType) / this.getLessonsCount();
  }

  public getLessonsTotatlTimeInMins() {
    return this.lessons.reduce((accumulator, lesson) => accumulator + lesson.durationInMins, 0);
  }
}
