import { compareDates } from "../utils/utils";
import DateRange from "../models/DateRange";
import Day from "../models/Day";
import Lesson from "../models/Lesson";
import CalendarService from "../services/CalendarService";

export default class DaysController {
  private calendarService: CalendarService;

  constructor(calendarService: CalendarService) {
    this.calendarService = calendarService;
  }

  public async getDays() {
    const lessons: Lesson[] = await this.calendarService.getCalendarFromExternalAPI();
    const firstLessonDate = lessons[0].getDate();
    const lastLessonDate = lessons[lessons.length - 1].getDate();
    const dateRange = new DateRange(firstLessonDate, lastLessonDate);
    const days = this.prepareDaysObjectsFromDateRange(dateRange);
    return this.matchLessonsWithDays(lessons, days);
  }

  private matchLessonsWithDays(lessons: Lesson[], days: Day[]) {
    let lessonIndex = 0;
    let dayIndex = 0;
    let lessonsBuffer = [];
    while (lessonIndex < lessons.length && dayIndex < days.length) {
      if (compareDates(lessons[lessonIndex].getDate(), days[dayIndex].date)) {
        if (lessons[lessonIndex].description.attending) lessonsBuffer.push(lessons[lessonIndex]);
        lessonIndex += 1;
      } else {
        days[dayIndex].setLessons(lessonsBuffer);
        lessonsBuffer = [];
        dayIndex += 1;
      }
    }
    return days;
  }

  private prepareDaysObjectsFromDateRange(dateRange: DateRange) {
    const datesArray = dateRange.getRangeArray();
    return datesArray.map(date => new Day(date));
  }
}
