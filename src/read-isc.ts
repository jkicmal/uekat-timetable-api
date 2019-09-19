import fs from "fs";
import { promisify } from "util";
import moment from "moment-timezone";
import ical2json from "ical2json";
import Lecture from "./Lecture";
import LectureDescription from "./LectureDescription";
import { clg } from "./utils";

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

    lectures.forEach((lecture: Lecture) => {
      if (lecture.description.attending === true) {
        clg([lecture.startTime, lecture.endTime]);
        clg([lecture.description.type, lecture.description.teacher]);
        clg(lecture.durationInMins);
        clg("===================");
      }
    });
  } catch (err) {
    clg(err);
  }
};

run();
