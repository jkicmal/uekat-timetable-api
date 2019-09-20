import moment from "moment-timezone";
import { Date } from "moment-timezone";
import Lecture from "./Lecture";

export default class Day {
  date: Date;
  lectures: Lecture[];

  constructor(date: Date) {
    this.date = date;
  }

  public setLectures(lectures: Lecture[]) {
    this.lectures = lectures;
  }

  public getLecturesCount() {
    return this.lectures.length;
  }

  public getLecturesOfTypeCount(lectureType: string) {
    if (this.getLecturesCount() === 0) return 0;
    return this.lectures.reduce(
      (accumulator, lecture) => (lecture.isOfType(lectureType) ? accumulator + 1 : accumulator),
      0
    );
  }

  public getLecturesTypePercentage(lectureType: string) {
    if (this.getLecturesCount() === 0) return 0;
    return this.getLecturesOfTypeCount(lectureType) / this.getLecturesCount();
  }

  public getLecturesTotatlTimeInMins() {
    return this.lectures.reduce((accumulator, lecture) => accumulator + lecture.durationInMins, 0);
  }
}
