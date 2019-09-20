// import fs from "fs";
// import { promisify } from "util";
// const readFile = promisify(fs.readFile);
// const calendarRaw = await readFile(`${__dirname}/calendar.ics`, "utf-8");
import axios from "axios";
import moment from "moment-timezone";
import ical2json from "ical2json";
import Lecture from "./models/Lecture";
import LectureDescription from "./models/LectureDescription";
import { clg, compareDates } from "./utils/utils";
import DateRange from "./models/DateRange";
import Day from "./models/Day";
import { CALENDAR_URL } from "./utils/constants";

const init = async () => {
  try {
    console.log("Downloadning calendar...");
    const calendarRaw = await getCalendarFromInternet();
    console.log("Calendar downloaded.");

    console.log("Converting calendar...");
    const convertedCalendar = ical2json.convert(calendarRaw);
    console.log("Calendar converted.");

    moment.tz.setDefault(getTimezoneFromCalendar(convertedCalendar));

    console.log("Preparing objects...");
    const lectures = parseCalendarToLecturesObjectsArray(convertedCalendar);
    const firstLectureDate = lectures[0].getDate();
    const lastLectureDate = lectures[lectures.length - 1].getDate();
    const dateRange = new DateRange(firstLectureDate, lastLectureDate);
    const days = prepareDaysObjectsFromDateRange(dateRange);
    console.log("Objects prepared.");

    console.log("Matching lectures with days...");
    const matchedDays = matchLecturesWithDaysNew(lectures, days);
    console.log("Lectures matched.");

    console.log("Completed!");
    // testLogMatchedDays(matchedDays);
  } catch (err) {
    clg(err);
  }
};

const getCalendarFromInternet = async () => {
  try {
    const response = await axios.get(CALENDAR_URL);
    return response.data;
  } catch (err) {
    clg(err);
  }
};

const getTimezoneFromCalendar = convertedCalendar => {
  return convertedCalendar.VCALENDAR[0].VTIMEZONE[0].TZID;
};

const prepareDaysObjectsFromDateRange = dateRange => {
  const datesArray = dateRange.getRangeArray();
  return datesArray.map(date => new Day(date));
};

const parseCalendarToLecturesObjectsArray = convertedCalendar => {
  const calendarEntries = convertedCalendar.VCALENDAR[0].VEVENT;
  return calendarEntries.map(
    calendarEntry =>
      new Lecture(
        calendarEntry.DTSTART,
        calendarEntry.DTEND,
        LectureDescription.fromCalendarSummary(calendarEntry.DESCRIPTION),
        calendarEntry.LOCATION
      )
  );
};

const matchLecturesWithDays = (lectures: Lecture[], days: Day[]) => {
  days.forEach((day: Day) => {
    const matchingLectures = lectures.filter((lecture: Lecture) => {
      return (
        // Is one of lectures that I am attenting to
        // ... and has a matching date to a current day
        lecture.description.attending === true && compareDates(lecture.getDate(), day.date)
      );
    });
    day.setLectures(matchingLectures);
  });
  return days;
};

const matchLecturesWithDaysNew = (lectures: Lecture[], days: Day[]) => {
  let lectureIndex = 0;
  let dayIndex = 0;
  let lecturesBuffer = [];
  while (lectureIndex < lectures.length && dayIndex < days.length) {
    if (compareDates(lectures[lectureIndex].getDate(), days[dayIndex].date)) {
      if (lectures[lectureIndex].description.attending) lecturesBuffer.push(lectures[lectureIndex]);
      lectureIndex += 1;
    } else {
      days[dayIndex].setLectures(lecturesBuffer);
      lecturesBuffer = [];
      dayIndex += 1;
    }
  }
  return days;
};

const testLogMatchedDays = (matchedDays: Day[]) => {
  matchedDays.forEach((day: Day) => {
    const lectureCreditPercentage = day.getLecturesTypePercentage(
      LectureDescription.TYPES.LECTURE_CREDIT
    );
    const lectureExamPercentage = day.getLecturesTypePercentage(
      LectureDescription.TYPES.LECTURE_EXAM
    );
    const lecturePercentage = lectureCreditPercentage + lectureExamPercentage;
    if (lecturePercentage >= 0.99) {
      console.log("_______________________________________________________");
      console.log(`DATA: ${day.date}`);
      console.log(`LICZBA LEKCJI: ${day.getLecturesCount()}`);
      console.log(`CZAS W H: ${(day.getLecturesTotatlTimeInMins() / 60).toFixed(2)}`);
    }
  });
};

init();

// const testDays = DateRange.fromCurrentWeek().getRangeArray();
// clg(testDays);
