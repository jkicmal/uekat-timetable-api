import axios from "axios";
import moment from "moment-timezone";
import ical2json from "ical2json";
import { CALENDAR_URL } from "../utils/constants";
import LessonDescription from "../models/LessonDescription";
import Lesson from "../models/Lesson";

export default class CalendarService {
  public async getCalendarFromExternalAPI() {
    try {
      console.log("Downloadning calendar...");
      const calendarRaw = await this.getCalendarFromInternet();
      console.log("Calendar downloaded.");

      console.log("Converting calendar...");
      const convertedCalendar = ical2json.convert(calendarRaw);
      console.log("Calendar converted.");

      console.log("Setting timezone");
      console.log();
      moment.tz.setDefault(this.getTimezoneFromCalendar(convertedCalendar));
      console.log("Timezone set.");

      console.log("Preparing objects...");
      return this.parseCalendarToLessonsObjectsArray(convertedCalendar);
    } catch (err) {
      // UNHANDLED ERROR
    }
  }

  private parseCalendarToLessonsObjectsArray(convertedCalendar) {
    const calendarEntries = convertedCalendar.VCALENDAR[0].VEVENT;
    return calendarEntries.map(
      calendarEntry =>
        new Lesson(
          calendarEntry.DTSTART,
          calendarEntry.DTEND,
          LessonDescription.fromCalendarSummary(calendarEntry.DESCRIPTION),
          calendarEntry.LOCATION
        )
    );
  }

  private async getCalendarFromInternet() {
    try {
      const response = await axios.get(CALENDAR_URL);
      return response.data;
    } catch (err) {
      // UNHANDLED ERROR
    }
  }

  private getTimezoneFromCalendar(convertedCalendar) {
    try {
      return convertedCalendar.VCALENDAR[0].VTIMEZONE[0].TZID;
    } catch (err) {
      // UNHANDLED ERROR
    }
  }
}
