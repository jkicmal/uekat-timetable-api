import moment from "moment-timezone";
import { Date } from "moment-timezone";
import Lesson from "./Lesson";
import LessonDescription from "./LessonDescription";
import Break from "./Break";

export default class Day {
  date: Date;
  startTime: string;
  endTime: string;
  lessonsCount: number;
  lecturesCount: number;
  seminar: boolean;
  lessons: Lesson[];
  breaks: Break[];

  constructor(date: Date) {
    this.date = date;
    this.startTime = null;
    this.endTime = null;
    this.lessonsCount = 0;
    this.lecturesCount = 0;
    this.seminar = false;
    this.lessons = [];
    this.breaks = [];
  }

  public setLessons(lessons: Lesson[]) {
    this.lessons = lessons;
    if (lessons.length > 0) {
      this.startTime = lessons[0].startTime;
      this.endTime = lessons[lessons.length - 1].endTime;
      this.lessonsCount = lessons.length;
      this.lecturesCount = this.calculateLecturesCount(lessons);
      this.seminar = this.lessonsContainSeminar(lessons);
      this.breaks = Break.fromLessonsArray(lessons);
    } else {
      // UNHANDLED ERROR: Lessons array is empty
    }
  }

  private lessonsContainSeminar(lessons: Lesson[]): boolean {
    for (const lesson of lessons) if (lesson.isOfType(LessonDescription.TYPES.SEMINAR)) return true;
    return false;
  }

  private calculateLecturesCount(lessons: Lesson[]): number {
    return lessons.reduce((acc: number, lesson: Lesson) => {
      if (lesson.isLecture()) return acc + 1;
      return acc;
    }, 0);
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
