import fs from "fs";
import { promisify } from "util";
import moment from "moment-timezone";
import ical2json from "ical2json";
import Lecture from "./models/Lecture";
import LectureDescription from "./models/LectureDescription";
import { clg } from "./utils/utils";
import DateRange from "./models/DateRange";
import Day from "./models/Day";

const readFile = promisify(fs.readFile);

const run = async () => {
  try {
    const calendarRaw = await readFile(`${__dirname}/calendar.ics`, "utf-8");
    const calendarIcal = ical2json.convert(calendarRaw);

    const timezone = calendarIcal.VCALENDAR[0].VTIMEZONE[0].TZID;
    moment.tz.setDefault(timezone);

    const calendarEntries = calendarIcal.VCALENDAR[0].VEVENT;
    const lectures: Lecture[] = calendarEntries.map(
      calendarEntry =>
        new Lecture(
          calendarEntry.DTSTART,
          calendarEntry.DTEND,
          LectureDescription.fromCalendarSummary(calendarEntry.DESCRIPTION),
          calendarEntry.LOCATION
        )
    );

    const dateRange = new DateRange(lectures[0].getDate(), lectures[lectures.length - 1].getDate());
    const datesArray = dateRange.getRangeArray();
    const days: Day[] = datesArray.map(date => new Day(date));
    const matchedDays = matchLecturesWithDays(lectures, days);
    console.log(matchedDays[1].lectures);
    // matchedDays.forEach((day: Day) => {
    //   const lectureCreditPercentage = day.getLecturesTypePercentage(
    //     LectureDescription.TYPES.LECTURE_CREDIT
    //   );
    //   const lectureExamPercentage = day.getLecturesTypePercentage(
    //     LectureDescription.TYPES.LECTURE_EXAM
    //   );
    //   const lecturePercentage = lectureCreditPercentage + lectureExamPercentage;
    //   if (lecturePercentage >= 0.99) {
    //     console.log("_______________________________________________________");
    //     console.log(`DATA: ${day.date}`);
    //     console.log(`LICZBA LEKCJI: ${day.getLecturesCount()}`);
    //     console.log(`CZAS W H: ${(day.getLecturesTotatlTimeInMins() / 60).toFixed(2)}`);
    //   }
    // });
  } catch (err) {
    clg(err);
  }
};

const matchLecturesWithDays = (lectures: Lecture[], days: Day[]) => {
  days.forEach((day: Day) => {
    const matchingLectures = lectures.filter((lecture: Lecture) => {
      return (
        // Is one of lectures that I am attenting to
        // ... and has a matching date to a current day
        lecture.description.attending === true && moment(lecture.getDate()).isSame(moment(day.date))
      );
    });
    day.setLectures(matchingLectures);
  });
  return days;
};

run();

// const testDays = DateRange.fromCurrentWeek().getRangeArray();
// clg(testDays);
