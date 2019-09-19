import { promises as fs } from "fs";
import moment from "moment-timezone";
import ical2json from "ical2json";

import Lecture from "./Lecture";

// class LectureLocalizationValidator {}
// class LectureDescriptionValidator {}

/**
 * Lecture types
 * - Ćwiczenia, Wykład, Laboratoria, Seminarium, Języki
 * Jeśli seminarium to tylko z dr Tomasz Staś
 * *
 * W innym przypadku            attending = false
 * Jeśli języki                 attending = false
 * Jeśli code nie ma 02         attending = false
 */

// interface VCALENDAR {}

// Calendar - Array of Objects

// interface VTIMEZONE {
//   TZID: String;
// }

const run = async () => {
  try {
    const calendarRaw = await fs.readFile(`${__dirname}/calendar.ics`, "utf-8");
    const calendarIcal = ical2json.convert(calendarRaw);

    const timezone = calendarIcal.VCALENDAR[0].VTIMEZONE[0].TZID;
    moment.tz.setDefault(timezone);

    const calendarEntries = calendarIcal.VCALENDAR[0].VEVENT;
    const lectures = calendarEntries.map(
      calendarEntry =>
        new Lecture(
          calendarEntry.DTSTART,
          calendarEntry.DTEND,
          calendarEntry.DESCRIPTION,
          calendarEntry.LOCATION
        )
    );

    // const vtimezone
    console.log(calendarIcal.VCALENDAR[0].VTIMEZONE[0].STANDARD);
  } catch (err) {
    console.log(err);
  }
};

run();
